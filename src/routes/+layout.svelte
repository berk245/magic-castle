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
			const isPublicRoute = noAuthRoutes.includes(currentPath);

			if (!user && !isPublicRoute) {
				// Unauthenticated user wants to go to a protected route
				goto('/login');
				return;
			} else if (!user && isPublicRoute) {
				// Unauthenticated user wants to go to a public route
				goto(currentPath);
				return;
			} else if (user && isPublicRoute) {
				// Authenticated user wants to go to a public route
				goto('/dashboard');
				return;
			} else if (user && !isPublicRoute) {
				// Authenticated user wants to go to a private route
				goto(currentPath);
				return;
			}
		});
	});
</script>

<Navbar user={$authStore.user} />
<slot />
