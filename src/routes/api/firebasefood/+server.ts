// src/routes/api/firebase/+server.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { json } from "@sveltejs/kit";

const firebaseConfig = {
  apiKey: "AIzaSyBperuUWtP36lO_cRyGYSxuiTkhpy54F_Q",
  authDomain: "myvue3-e45b9.firebaseapp.com",
  projectId: "myvue3-e45b9",
  storageBucket: "myvue3-e45b9.firebasestorage.app",
  messagingSenderId: "439732498123",
  appId: "1:439732498123:web:46d43d1cb409e8678c754e",
  measurementId: "G-80R2D8D149",
};

// 初始化 Firebase（可以考慮移到單獨的模組中）
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/** @type {import('./$types').RequestHandler} */
export async function GET() {
  try {
    // 獲取 myvue3food 集合
    const myvue3foodCollection = collection(db, "myvue3food");

    // 獲取所有文件
    const snapshot = await getDocs(myvue3foodCollection);

    // 處理文件資料
    const documents = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    // 返回 JSON 響應
    return json(
      {
        myvue3food: documents,
      },
      {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching data from Firebase:", error);

    // 返回錯誤響應
    return json(
      {
        error: "Failed to fetch data",
        message: error.message,
      },
      {
        status: 500,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      }
    );
  }
}
