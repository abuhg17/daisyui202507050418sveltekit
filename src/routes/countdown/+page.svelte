<script>
  import { onMount } from 'svelte';

  let targetDate = new Date('2025-07-05T04:18:00').getTime();
  let countdown = '';

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (distance < 0) {
      countdown = 'EXPIRED';
    } else {
      countdown = `${days}天 ${hours}小時 ${minutes}分鐘 ${seconds}秒`;
    }
  }

  onMount(() => {
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  });
</script>

<div class="min-h-screen bg-gradient-to-r from-red-800 via-black to-indigo-900 p-6">
  <div class="container mx-auto">
    <h1 class="text-white text-4xl font-bold text-center mb-4">This is Countdown Page.</h1>
    <h2 class="text-white text-2xl text-center mb-2">First, fetch /api/countdown/202507050418 once.</h2>
    <h2 class="text-white text-2xl text-center mb-8">Second, setInterval every one sec.</h2>
    
    <div class="flex flex-col items-center gap-8 max-w-6xl mx-auto">
      <!-- 警示卡片群 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        <div class="bg-red-500 text-white rounded-lg p-6 shadow-xl hover:scale-105 transition duration-200 cursor-help" title="全世界各國首都圈大地震">
          <div class="text-center">
            <h3 class="text-xl font-bold mb-2">⚠️ 全世界各國首都圈大地震</h3>
            <p class="text-lg">2025/07/05 04:18<br />(當地時間)</p>
          </div>
        </div>
        
        <div class="bg-red-600 text-white rounded-lg p-6 shadow-xl hover:scale-105 transition duration-200 cursor-help" title="日本東京首都圈大地震">
          <div class="text-center">
            <h3 class="text-xl font-bold mb-2">⚠️ 日本東京首都圈大地震</h3>
            <p class="text-lg">2025/07/05 04:18<br />(當地時間)</p>
          </div>
        </div>

        <div class="bg-red-500 text-white rounded-lg p-6 shadow-xl hover:scale-105 transition duration-200 cursor-help" title="臺灣臺北首都圈大地震">
          <div class="text-center">
            <h3 class="text-xl font-bold mb-2">⚠️ 臺灣臺北首都圈大地震</h3>
            <p class="text-lg">2025/07/05 04:18<br />(當地時間)</p>
          </div>
        </div>

        <div class="bg-red-400 text-white rounded-lg p-6 shadow-xl hover:scale-105 transition duration-200 cursor-help" title="美國華盛頓首都圈大地震">
          <div class="text-center">
            <h3 class="text-xl font-bold mb-2">⚠️ 美國華盛頓首都圈大地震</h3>
            <p class="text-lg">2025/07/05 04:18<br />(當地時間)</p>
          </div>
        </div>

        <div class="bg-red-300 text-white rounded-lg p-6 shadow-xl hover:scale-105 transition duration-200 cursor-help" title="中國北京首都圈大地震">
          <div class="text-center">
            <h3 class="text-xl font-bold mb-2">⚠️ 中國北京首都圈大地震</h3>
            <p class="text-lg">2025/07/05 04:18<br />(當地時間)</p>
          </div>
        </div>

        <div class="bg-red-200 text-gray-800 rounded-lg p-6 shadow-xl hover:scale-105 transition duration-200 cursor-help" title="英國倫敦首都圈大地震">
          <div class="text-center">
            <h3 class="text-xl font-bold mb-2">⚠️ 英國倫敦首都圈大地震</h3>
            <p class="text-lg">2025/07/05 04:18<br />(當地時間)</p>
          </div>
        </div>
      </div>

      <!-- 倒數計時器 -->
      <div class="bg-white/10 backdrop-blur-md rounded-xl shadow-2xl p-8 w-full max-w-2xl text-center">
        <h2 class="text-4xl font-extrabold text-white mb-6">
          距離 2025/07/05 04:18 還有
        </h2>
        <div class="text-5xl font-extrabold text-red-400">
          {countdown}
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .container {
    max-width: 1200px;
  }
</style>

