import { error } from "@sveltejs/kit";
import axios from "axios";

export async function GET({ url }) {
  const imageUrl = url.searchParams.get("url");

  if (!imageUrl) {
    throw error(400, "請提供 url 參數");
  }

  try {
    const response = await axios.get(imageUrl, {
      responseType: "stream",
      headers: {
        Referer: "https://www.bilibili.com/",
        // User-Agent 可以加上模擬瀏覽器，視需要
      },
    });

    const contentType = response.headers["content-type"];
    const cacheControl = "public, max-age=86400";

    return new Response(response.data, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": cacheControl,
      },
    });
  } catch (err) {
    console.error("圖片代理失敗:", err);
    throw error(500, { message: "圖片代理失敗", details: err.message });
  }
}
