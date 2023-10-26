<script>
	import { authStore } from '$lib/store/store';
</script>

{#if !$authStore.loading && $authStore.user}
	<h1>User dashboard</h1>
	<p>Welcome, user email: {$authStore.user}</p>
{/if}
