// src/routes/api/countdown/[slug]/+server.js
import { json } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
  const slug = params.slug;

  if (!slug || slug.length < 12) {
    return json(
      { error: "Invalid slug. Format should be: YYYYMMDDHHMM" },
      { status: 400 }
    );
  }

  try {
    // 轉換為 ISO 格式並指定台北時區（+08:00）
    const slugISO =
      slug.slice(0, 4) +
      "-" + // YYYY-
      slug.slice(4, 6) +
      "-" + // MM-
      slug.slice(6, 8) +
      "T" + // DD + T
      slug.slice(8, 10) +
      ":" + // HH:
      slug.slice(10, 12) +
      ":00+08:00"; // MM:00 + 時區

    const now = new Date();
    const next = new Date(slugISO);

    // 檢查日期是否有效
    if (isNaN(next.getTime())) {
      return json({ error: "Invalid date format in slug" }, { status: 400 });
    }

    const diffMs = next.getTime() - now.getTime();
    const diffSec = Math.floor(diffMs / 1000);

    let remaining = diffSec;
    const diffday = Math.floor(remaining / 86400);
    remaining -= diffday * 86400;

    const diffhour = Math.floor(remaining / 3600);
    remaining -= diffhour * 3600;

    const diffminute = Math.floor(remaining / 60);
    const diffsecond = remaining % 60;

    return json({
      slug,
      now: now.toISOString(),
      slugISO,
      next: next.toISOString(),
      diffMs,
      diffday,
      diffhour,
      diffminute,
      diffsecond,
    });
  } catch (error) {
    console.error("Error processing countdown:", error);

    return json(
      {
        error: "Failed to process countdown",
        message: error.message,
      },
      { status: 500 }
    );
  }
}
