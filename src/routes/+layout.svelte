<script>
	import '../app.postcss';
	import { auth, db } from '../lib/firebase/firebase';
	import { authStore } from '$lib/store/store';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
	import Navbar from '$components/Navbar.svelte';
	const noAuthRoutes = ['/', '/login', '/signup'];
	let currentPath;

	const updateAuthStore = (authStore, user, userTricks) => {
		authStore.update((curr) => {
			return {
				...curr,
				user: user?.email || null,
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

	const getUserTricks = async (user) => {
		if (!user) return [];
		const userRef = doc(db, 'users', user.uid);
		const userSnap = await getDoc(userRef);
		if (!userSnap.exists()) {
			console.log('No data for this user found in the collection.');
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

		let formattedTricks = [];
		userTricks.forEach((doc) => {
			formattedTricks.push({ ...doc.data(), id: doc.id });
		});
		return formattedTricks;
	};
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
