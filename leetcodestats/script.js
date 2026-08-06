const openButton = document.getElementById("leetcode-open");
const closeButton = document.getElementById("leetcode-close");
const modal = document.getElementById("leetcode-modal");
const backdrop = document.getElementById("leetcode-backdrop");
const status = document.getElementById("leetcode-modal-status");
const content = document.getElementById("leetcode-modal-content");

let loading = false;
let lastFocusedElement = null;
let activeRequestId = 0;

openButton.addEventListener("click", openModal);
closeButton.addEventListener("click", closeModal);

backdrop.addEventListener("click", (event) => {
  if (event.target === backdrop) {
    closeModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && isModalOpen()) {
    closeModal();
  }
});

function isModalOpen() {
  return !modal.classList.contains("hidden");
}

function openModal() {
  lastFocusedElement = document.activeElement;

  modal.classList.remove("hidden");
  modal.setAttribute("aria-hidden", "false");
  openButton.setAttribute("aria-expanded", "true");
  document.body.classList.add("modal-open");

  closeButton.focus();
  loadLeetCodeStats();
}

function closeModal() {
  if (!isModalOpen()) {
    return;
  }

  modal.classList.add("hidden");
  modal.setAttribute("aria-hidden", "true");
  openButton.setAttribute("aria-expanded", "false");
  document.body.classList.remove("modal-open");

  if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
    lastFocusedElement.focus();
  } else {
    openButton.focus();
  }
}

async function loadLeetCodeStats() {
  const requestId = ++activeRequestId;

  loading = true;
  status.textContent = "Loading latest LeetCode statistics...";
  content.innerHTML = "";

  try {
    const response = await fetch("/api/leetcode", {
      cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Could not load data.");
    }

    if (requestId !== activeRequestId) {
      return;
    }

    status.textContent = "";
    content.innerHTML = renderStats(data);
  } catch (error) {
    if (requestId !== activeRequestId) {
      return;
    }

    status.textContent =
      "Could not load LeetCode statistics right now. Please try again in a moment.";
    content.innerHTML = `
      <section class="detail-section" aria-live="polite">
        <h3>Unable to load data</h3>
        <p class="muted">${escapeHtml(error.message)}</p>
      </section>
    `;
  } finally {
    if (requestId === activeRequestId) {
      loading = false;
    }
  }
}

function renderStats(data) {
  const contest = renderContestSection(data.contest);
  const badges = renderBadges(data.badges || []);
  const recentSolved = renderRecentSolved(data.recentSolved || []);

  return `
    <div class="leetcode-heading">
      <div>
        <p class="leetcode-label">Problem solving</p>
        <h2>${Number(data.solved.all || 0).toLocaleString()} total solved</h2>
      </div>
    </div>

    <div class="stats-grid">
      ${stat("Easy", `${number(data.solved.easy)} / ${number(data.totals.easy)}`)}
      ${stat("Medium", `${number(data.solved.medium)} / ${number(data.totals.medium)}`)}
      ${stat("Hard", `${number(data.solved.hard)} / ${number(data.totals.hard)}`)}
      ${stat("Total submissions", number(data.totalSubmissions))}
      ${stat("Current streak", `${number(data.currentStreak)} days`)}
      ${stat("Maximum streak", `${number(data.maxStreak)} days`)}
      ${stat("Profile rank", `#${number(data.profileRank)}`)}
    </div>

    ${contest}
    ${badges}
    ${recentSolved}
  `;
}

function renderContestSection(contest) {
  if (!contest || typeof contest !== "object") {
    return "";
  }

  const rows = [];

  if (isFiniteNumber(contest.rating)) {
    rows.push(stat("Contest rating", number(Math.round(contest.rating))));
  }

  if (isFiniteNumber(contest.rank)) {
    rows.push(stat("Contest rank", `#${number(contest.rank)}`));
  }

  if (isFiniteNumber(contest.topPercentage)) {
    rows.push(stat("Top percentage", `${Number(contest.topPercentage).toFixed(2)}%`));
  }

  if (!rows.length) {
    return "";
  }

  return `
    <section class="detail-section">
      <h3>Contest</h3>
      <div class="contest-grid">${rows.join("")}</div>
    </section>
  `;
}

function renderBadges(badges) {
  if (!badges.length) {
    return "";
  }

  return `
    <section class="detail-section">
      <h3>Badges</h3>
      <div class="badges-grid">
        ${badges
          .map((badge) => {
            const icon = escapeHtml(badge.icon || "");
            const name = escapeHtml(badge.name || "Badge");

            return `
              <div class="badge">
                <img src="${icon}" alt="${name} icon" loading="lazy" />
                <span>${name}</span>
              </div>
            `;
          })
          .join("")}
      </div>
    </section>
  `;
}

function renderRecentSolved(recentSolved) {
  const items = recentSolved.slice(0, 5);

  if (!items.length) {
    return `
      <section class="detail-section">
        <h3>Recently solved</h3>
        <p class="muted">No recently solved questions available.</p>
      </section>
    `;
  }

  return `
    <section class="detail-section">
      <h3>Recently solved</h3>
      <ul class="recent-list">
        ${items
          .map(
            (problem) => `
              <li>
                <span class="recent-title">${escapeHtml(problem.title || "Untitled problem")}</span>
                <span>${formatDate(problem.timestamp)}</span>
              </li>
            `
          )
          .join("")}
      </ul>
    </section>
  `;
}

function stat(label, value) {
  return `
    <article class="stat">
      <span class="stat-label">${escapeHtml(label)}</span>
      <strong class="stat-value">${escapeHtml(String(value))}</strong>
    </article>
  `;
}

function formatDate(timestamp) {
  const seconds = Number(timestamp);

  if (!Number.isFinite(seconds) || seconds <= 0) {
    return "Unknown date";
  }

  return new Date(seconds * 1000).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function number(value) {
  const numeric = Number(value);

  if (!Number.isFinite(numeric)) {
    return "0";
  }

  return numeric.toLocaleString();
}

function isFiniteNumber(value) {
  return Number.isFinite(Number(value));
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    }[character];
  });
}