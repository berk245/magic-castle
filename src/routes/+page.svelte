<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	onMount(() => {
		// Check for access token in localStorage. Redirect to login page if no token is saved
		const token = localStorage.getItem('access_token');
		if (!token) goto('/login');
		else goto('/gallery');
	});
</script>
