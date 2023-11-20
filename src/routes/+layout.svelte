<script>
	import '../app.postcss';
	import { auth } from '../lib/firebase/firebase';
	import { authStore } from '$lib/store/store';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { getUserTricks } from '$lib/handlers/db.js';
	import Navbar from '$components/Navbar.svelte';
	const noAuthRoutes = ['/', '/login', '/signup'];
	let currentPath;

	const updateAuthStore = (authStore, user, userTricks) => {
		authStore.update((curr) => {
			return {
				...curr,
				user: user || null,
				loading: false,
				tricks: userTricks
			};
		});
	};

	onMount(() => {
		const unsubscribe = auth.onAuthStateChanged(async (user) => {
			let userTricks = await getUserTricks(user);
			updateAuthStore(authStore, user, userTricks);
			redirectUser(user);
		});
	});

	const redirectUser = (user) => {
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
			goto('/gallery');
			return;
		} else if (user && !isPublicRoute) {
			// Authenticated user wants to go to a private route
			goto(currentPath);
			return;
		}
	};
</script>

<div class="h-[70px]">
	<Navbar user={$authStore.user} />
</div>
<slot />
