// src/routes/api/hello/+server.ts
import { json } from "@sveltejs/kit";

export function GET() {
  return json({
    message: "Hello World.",
    message2: "こんにちは、世界。",
    message3: "世界，你好!",
  });
}
