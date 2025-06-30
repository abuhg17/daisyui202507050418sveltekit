<script>
  import "../app.css";
</script>

<h1>This is Home Page.</h1>
<p>
  <a href="https://daisyui202507050418sveltekit.vercel.app" class="btn btn-ghost text-xl">
    vercel 20250705 0418
  </a>
  <img src="/qr3vercel.png" width="100" alt="vercel QR" />
</p>

<h5>
  <a href="https://daisyui202507050418sveltekit.netlify.app/" class="btn btn-ghost text-xl">
    netlify 20250705 0418
  </a>
  <img src="/qr3netlify.png" width="100" alt="netlify QR" />
</h5>

<h3>
  <a href="https://daisyui202507050418sveltekit.onrender.com" class="btn btn-ghost text-xl">
    render 20250705 0418
  </a>
  <img src="/qr3render.png" width="100" alt="render QR" />
</h3>

<h1>API Test:</h1>
{#each [
  ["hello", "api hello"],
  ["countdown/1111", "countdown 1111"],
  ["countdown/202507050418", "countdown 202507050418"],
  ["bilibili/BV1BELHzyEMi", "bilibili BV1B~"],
  ["bilibili/BV1Et4y1r7Eu", "bilibili BV1E~"],
  ["bilibili/1111", "bilibili 1111"],
  ["bilibili/proxyimg?url=http://i1.hdslb.com/bfs/archive/b168c77ff9d280b3d9f7f8a134ddc9df9c953ec9.jpg", "bilibili proxyimg"],
  ["firebasefood", "firebasefood"],
  ["youtube/videos/WS3sGVgkOZk", "youtube WS3s~"],
  ["youtube/channel/UCTwKpp4T5n1wyxLVf-cD4ew", "youtube channel UCTw~"],
  ["youtube/videos/-4ADGW7TE0Q", "youtube -4AD~"],
  ["youtube/channel/UCRykoXOF-1jb0DS4P34NG6Q", "youtube channel UCRy~"]
] as [path, label]}
  <h3>
    <a href={`/api/${path}`} class="btn btn-ghost text-xl">
      {label}
    </a>
  </h3>
{/each}