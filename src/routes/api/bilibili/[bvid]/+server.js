import { json } from "@sveltejs/kit";
import axios from "axios";

export async function GET({ params }) {
  const { bvid } = params;

  if (!bvid) {
    return json({ error: "請提供 bvid 參數" }, { status: 400 });
  }

  try {
    const res = await axios.get(
      "https://api.bilibili.com/x/web-interface/view",
      {
        params: { bvid },
      }
    );

    const { pic, title, owner, stat, pages } = res.data.data;
    const { data } = res.data;
    const raw = data;
    const newdata = {};
    for (const key in raw) {
      if (typeof raw[key] !== "object") {
        newdata[key] = raw[key];
      }
    }

    return json({
      pic,
      title,
      owner,
      stat,
      data: newdata,
      pages,
    });
  } catch (error) {
    console.error("無法取得 Bilibili 資料:", error);
    return json(
      {
        error: "無法取得 Bilibili 資料",
        message: error.message,
        status: error.response?.status,
        response: error.response?.data,
      },
      { status: error.response?.status || 500 }
    );
  }
}
