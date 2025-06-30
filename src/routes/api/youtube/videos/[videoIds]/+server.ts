// src/routes/api/youtube/videos/[videoIds]/+server.js
import axios from "axios";
import { json } from "@sveltejs/kit";

export async function GET({ params }) {
  const videoIdsParam = params.videoIds;
  const apikey = "AIzaSyAUD7ipwX-VAIIgbtw4V6sHKOTfyWoPdMo";

  if (!videoIdsParam) {
    return json(
      { error: "請提供 videoIds 參數（可用逗號分隔多個）" },
      { status: 400 }
    );
  }

  const videoIds = videoIdsParam
    .split(",")
    .map((v) => v.trim())
    .filter((v) => v.length > 0);

  if (videoIds.length === 0 || videoIds.length > 50) {
    return json({ error: "影片 ID 數量需介於 1 到 50 之間" }, { status: 400 });
  }

  try {
    const res = await axios.get(
      "https://www.googleapis.com/youtube/v3/videos",
      {
        params: {
          part: "snippet,statistics",
          id: videoIds.join(","),
          key: apikey,
        },
      }
    );

    const items = res.data?.items || [];

    if (items.length === 0) {
      return json({ error: "找不到任何影片資料" }, { status: 404 });
    }

    return json({
      count: items.length,
      items,
    });
  } catch (error) {
    return json(
      {
        error: "無法取得影片資料",
        message: error.message,
        status: error.response?.status || null,
        response: error.response?.data || null,
      },
      { status: 500 }
    );
  }
}
