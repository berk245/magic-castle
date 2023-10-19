<script>
	import { auth } from '../lib/firebase/firebase';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	const noAuthRoutes = ['/', 'login', '/signup'];

	onMount(() => {
		const unsubscribe = auth.onAuthStateChanged(async (user) => {
			console.log(user);
			const currentPath = window.location.pathname;
			console.log(currentPath);
			if (!user && !noAuthRoutes.includes(currentPath)) {
				// Unauthenticated user wants to go to a protected route
				goto('/login');
				return;
			}
			if (!user && noAuthRoutes.includes(currentPath)) {
				// Unauthenticated user wants to go to a public route
				goto(currentPath);
				return;
			}
			if (user) {
                // Authenticated user
				goto(currentPath);
				return;
			}
		});
	});
</script>

<slot />
