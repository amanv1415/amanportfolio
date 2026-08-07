const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = Number(process.env.PORT) || 3000;
const ROOT_DIR = __dirname;
const username = "amanv1415";
const currentYear = new Date().getUTCFullYear();

const profileQuery = `
  query PortfolioLeetCode(
    $username: String!
    $year: Int!
    $limit: Int!
  ) {
    allQuestionsCount {
      difficulty
      count
    }

    matchedUser(username: $username) {
      username

      profile {
        ranking
      }

      submitStats: submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
        }

        totalSubmissionNum {
          difficulty
          count
          submissions
        }
      }

      userCalendar(year: $year) {
        activeYears
        streak
        submissionCalendar
      }

      badges {
        id
        displayName
        icon
        creationDate
      }
    }

    recentAcSubmissionList(username: $username, limit: $limit) {
      title
      titleSlug
      timestamp
    }

    userContestRanking(username: $username) {
      rating
      globalRanking
      topPercentage
    }
  }
`;

const calendarQuery = `
  query UserCalendar($username: String!, $year: Int!) {
    matchedUser(username: $username) {
      userCalendar(year: $year) {
        submissionCalendar
      }
    }
  }
`;

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".pdf": "application/pdf",
  ".txt": "text/plain; charset=utf-8",
};

async function graphQL(query, variables) {
  const response = await fetch("https://leetcode.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Referer: "https://leetcode.com/",
    },
    body: JSON.stringify({ query, variables }),
  });

  const result = await response.json();

  if (!response.ok || result.errors) {
    throw new Error("LeetCode did not return profile data.");
  }

  return result.data;
}

function findDifficulty(items, difficulty) {
  return items.find((item) => item.difficulty === difficulty) || {};
}

function longestStreak(calendarStrings) {
  const activeDays = new Set();

  for (const calendarString of calendarStrings) {
    const calendar = JSON.parse(calendarString || "{}");

    for (const timestamp of Object.keys(calendar)) {
      activeDays.add(Math.floor(Number(timestamp) / 86400));
    }
  }

  const sortedDays = [...activeDays].sort((a, b) => a - b);

  let maximum = 0;
  let current = 0;
  let previousDay = null;

  for (const day of sortedDays) {
    current = previousDay !== null && day === previousDay + 1 ? current + 1 : 1;
    maximum = Math.max(maximum, current);
    previousDay = day;
  }

  return maximum;
}

async function getLeetCodeStats() {
  const data = await graphQL(profileQuery, {
    username,
    year: currentYear,
    limit: 5,
  });

  const user = data.matchedUser;

  if (!user) {
    throw new Error("LeetCode user was not found.");
  }

  const activeYears = user.userCalendar.activeYears || [currentYear];

  const calendarResults = await Promise.allSettled(
    activeYears.map(async (year) => {
      if (year === currentYear) {
        return user.userCalendar.submissionCalendar;
      }

      const yearData = await graphQL(calendarQuery, { username, year });
      return yearData.matchedUser?.userCalendar?.submissionCalendar || "{}";
    })
  );

  const calendars = calendarResults
    .filter((result) => result.status === "fulfilled")
    .map((result) => result.value);

  const accepted = user.submitStats.acSubmissionNum;
  const submissions = user.submitStats.totalSubmissionNum;
  const allSubmissions = findDifficulty(submissions, "All");

  return {
    username: user.username,
    profileRank: user.profile.ranking || 0,
    totalSubmissions: allSubmissions.submissions || 0,
    solved: {
      all: findDifficulty(accepted, "All").count || 0,
      easy: findDifficulty(accepted, "Easy").count || 0,
      medium: findDifficulty(accepted, "Medium").count || 0,
      hard: findDifficulty(accepted, "Hard").count || 0,
    },
    totals: {
      easy: findDifficulty(data.allQuestionsCount, "Easy").count || 0,
      medium: findDifficulty(data.allQuestionsCount, "Medium").count || 0,
      hard: findDifficulty(data.allQuestionsCount, "Hard").count || 0,
    },
    currentStreak: user.userCalendar.streak || 0,
    maxStreak: longestStreak(calendars),
    badges: user.badges.slice(0, 6).map((badge) => ({
      name: badge.displayName,
      icon: badge.icon,
      createdAt: badge.creationDate,
    })),
    recentSolved: data.recentAcSubmissionList.map((problem) => ({
      title: problem.title,
      titleSlug: problem.titleSlug,
      timestamp: problem.timestamp,
    })),
    contest: data.userContestRanking
      ? {
          rating: Math.round(data.userContestRanking.rating),
          rank: data.userContestRanking.globalRanking,
          topPercentage: data.userContestRanking.topPercentage,
        }
      : null,
  };
}

function resolveStaticPath(pathname) {
  const requestPath = pathname === "/" ? "/index.html" : pathname;
  const normalizedPath = path.normalize(decodeURIComponent(requestPath)).replace(/^([.][.][/\\])+/, "");
  const fullPath = path.join(ROOT_DIR, normalizedPath);

  if (!fullPath.startsWith(ROOT_DIR)) {
    return null;
  }

  return fullPath;
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (url.pathname === "/api/leetcode") {
    try {
      const stats = await getLeetCodeStats();

      res.writeHead(200, {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store",
      });

      res.end(JSON.stringify(stats));
      return;
    } catch (error) {
      console.error("LeetCode API error:", error);
      res.writeHead(502, { "Content-Type": "application/json; charset=utf-8" });
      res.end(
        JSON.stringify({
          error: "Unable to load LeetCode statistics right now.",
        })
      );
      return;
    }
  }

  const filePath = resolveStaticPath(url.pathname);

  if (!filePath) {
    res.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Invalid path");
    return;
  }

  fs.stat(filePath, (statErr, stats) => {
    if (statErr || !stats.isFile()) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("File not found");
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || "application/octet-stream";

    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("Could not read file");
        return;
      }

      res.writeHead(200, { "Content-Type": contentType });
      res.end(content);
    });
  });
});

server.listen(PORT, () => {
  console.log(`Portfolio running at http://localhost:${PORT}`);
});

/* ================= Visitor Counter ================= */

const visitorCounter = document.getElementById("visitor-count");

if (visitorCounter) {
    fetch("https://api.countapi.xyz/hit/amanv1415-portfolio/visits")
        .then(res => res.json())
        .then(data => {
            visitorCounter.textContent = `${data.value.toLocaleString()} Visitors`;
        })
        .catch(() => {
            visitorCounter.textContent = "0 Visitors";
        });
}