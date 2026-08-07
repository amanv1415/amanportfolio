export default async function handler(req, res) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
    req.socket?.remoteAddress ||
    "unknown";

  const today = new Date().toISOString().slice(0, 10);
  const visitorKey = `visitor:${ip}:${today}`;

  try {
    // Check if this visitor already counted today
    const check = await fetch(`${url}/get/${visitorKey}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const exists = await check.json();

    let count;

    if (exists.result === null) {
      // First visit today
      await fetch(`${url}/set/${visitorKey}/1`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Expire after 24 hours (86400 seconds)
      await fetch(`${url}/expire/${visitorKey}/86400`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const inc = await fetch(`${url}/incr/portfolio-visits`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const incData = await inc.json();
      count = incData.result;
    } else {
      // Already visited today
      const total = await fetch(`${url}/get/portfolio-visits`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const totalData = await total.json();
      count = totalData.result;
    }

    res.status(200).json({ count });

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
}