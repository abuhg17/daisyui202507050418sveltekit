<script>
  import { page } from '$app/stores';
  
  $: slug = $page.params.slug;
</script>

<h1>Blog Page</h1>
<h2>post: {slug}</h2>

