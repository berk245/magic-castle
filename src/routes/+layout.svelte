<script>
	import '../app.postcss';
	import { auth } from '../lib/firebase/firebase';
	import { authStore } from '$lib/store/store';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import Navbar from '$components/Navbar.svelte';
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

			// Access user data in Firestore
			if (!user) return;
			const userRef = doc(db, 'users', user.uid);
			const userSnap = await getDoc(userRef);

			// Check if a user document exists in firestore
			if (!userSnap.exists()) {
				// No data in the db. Create a user document in users collection
				const newUser = doc(db, 'users', user.uid);
				await setDoc(
					newUser,
					{
						email: user.email
					},
					{ merge: true }
				);
			}

			const tricksCollection = collection(userRef, 'tricks');
			// Get tricks in the collection
			const userTricks = await getDocs(tricksCollection);


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
		});
	});
</script>

<div class="h-[70px]">
	<Navbar user={$authStore.user} />
</div>
<slot />
