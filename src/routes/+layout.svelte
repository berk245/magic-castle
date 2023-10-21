<script>
	import { auth } from '../lib/firebase/firebase';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { authStore } from '../lib/store/store';
	import {authHandlers} from '../lib/handlers/auth'
	const noAuthRoutes = ['/', '/login', '/signup'];
	let currentPath;
	onMount(() => {
		const unsubscribe = auth.onAuthStateChanged(async (user) => {
			currentPath = window.location.pathname;
			if (!user && !noAuthRoutes.includes(currentPath)) {
				// Unauthenticated user wants to go to a protected route
				authStore.update((curr) => {
					return {
						...curr,
						user: null,
						loading: false
					};
				});
				goto('/login');
				return;
			}
			if (!user && noAuthRoutes.includes(currentPath)) {
				// Unauthenticated user wants to go to a public route
				goto(currentPath);
				return;
			}
			authStore.update((curr) => {
				return {
					...curr,
					user: user.email,
					loading: false
				};
			});
			if (user) {
				// Authenticated user
				goto(currentPath);
				return;
			}
		});
	});
</script>

{#if $authStore.user}
	<button on:click={authHandlers.signout}>Sign Out from main layout</button>
{/if}
<slot />
