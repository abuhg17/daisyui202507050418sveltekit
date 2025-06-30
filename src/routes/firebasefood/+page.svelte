<script>
  import { onMount } from 'svelte';

  let foods = [];
  let sortKey = '';
  let sortAsc = true;

  // Fetch data on component mount
  onMount(async () => {
    try {
      const response = await fetch("/api/firebasefood");
      const data = await response.json();
      foods = data.myvue3food || [];
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  });

  // Function to handle sorting
  function sort(key) {
    if (sortKey === key) {
      sortAsc = !sortAsc;
    } else {
      sortKey = key;
      sortAsc = true;
    }
  }

  // Function to display arrow for sorting direction
  function arrow(key) {
    if (sortKey !== key) return '';
    return sortAsc ? '🔼' : '🔽';
  }

  // Helper to parse date YYYY-MM-DD or YYYY/MM/DD
  function parseYMDDate(str) {
    if (typeof str !== 'string') return 0;
    const normalized = str.replace(/\//g, '-');
    const parts = normalized.split('-');
    if (parts.length === 3) {
      const [y, m, d] = parts.map(Number);
      if (!isNaN(y) && !isNaN(m) && !isNaN(d)) {
        return new Date(y, m - 1, d).getTime();
      }
    }
    return 0;
  }

  // Reactive declaration for sortedFoods
  $: sortedFoods = (() => {
    if (!sortKey) return foods;

    return [...foods].sort((a, b) => {
      let v1 = a[sortKey];
      let v2 = b[sortKey];

      if (sortKey === 'fooddate') {
        const t1 = parseYMDDate(v1);
        const t2 = parseYMDDate(v2);
        return sortAsc ? t1 - t2 : t2 - t1;
      }

      const n1 = parseFloat(v1);
      const n2 = parseFloat(v2);
      if (!isNaN(n1) && !isNaN(n2)) {
        return sortAsc ? n1 - n2 : n2 - n1;
      }

      return sortAsc
        ? String(v1).localeCompare(String(v2))
        : String(v2).localeCompare(String(v1));
    });
  })();
</script>

<h1>FirebaseFood Page</h1>

<p class="mb-2">
  目前排序：<strong>{sortKey || "無"}</strong>
  {#if sortKey}{sortAsc ? "🔼 升冪" : "🔽 降冪"}{/if}
</p>

<div class="overflow-x-auto">
  <table class="table table-zebra w-full">
    <thead>
      <tr>
        <th>#</th>
        <th on:click={() => sort('foodname')} class="cursor-pointer select-none">
          foodname <span>{arrow('foodname')}</span>
        </th>
        <th on:click={() => sort('foodbrand')} class="cursor-pointer select-none">
          foodbrand <span>{arrow('foodbrand')}</span>
        </th>
        <th on:click={() => sort('foodstore')} class="cursor-pointer select-none">
          foodstore <span>{arrow('foodstore')}</span>
        </th>
        <th on:click={() => sort('foodprice')} class="cursor-pointer select-none">
          foodprice <span>{arrow('foodprice')}</span>
        </th>
        <th on:click={() => sort('foodamount')} class="cursor-pointer select-none">
          foodamount <span>{arrow('foodamount')}</span>
        </th>
        <th on:click={() => sort('fooddate')} class="cursor-pointer select-none">
          fooddate <span>{arrow('fooddate')}</span>
        </th>
        <th on:click={() => sort('id')} class="cursor-pointer select-none">
          id <span>{arrow('id')}</span>
        </th>
      </tr>
    </thead>
    <tbody>
      {#each sortedFoods as food, idx}
        <tr>
          <td>{idx + 1}</td>
          <td>{food.foodname}</td>
          <td>{food.foodbrand}</td>
          <td>{food.foodstore}</td>
          <td>{food.foodprice}</td>
          <td>{food.foodamount}</td>
          <td>{food.fooddate}</td>
          <td>{food.id}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  /* Add any specific styles here if needed */
</style>


