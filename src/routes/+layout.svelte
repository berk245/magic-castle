<script>
	import '../app.postcss';
	import { auth } from '../lib/firebase/firebase';
	import { authStore } from '$lib/store/store';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import Navbar from '../lib/components/Navbar.svelte';
	const noAuthRoutes = ['/', '/login', '/signup'];
	let currentPath;

	const updateAuthStore = (authStore, user) => {
		authStore.update((curr) => {
			return {
				...curr,
				user: user?.email || null,
				loading: false
			};
		});
	};

	onMount(() => {
		const unsubscribe = auth.onAuthStateChanged(async (user) => {
			//Update the auth store with new user data
			updateAuthStore(authStore, user);

			currentPath = window.location.pathname;
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

<Navbar user={$authStore.user} />
<slot />
