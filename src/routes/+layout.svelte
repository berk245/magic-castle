<script>
	import { auth } from '../lib/firebase/firebase';
	import { onMount } from 'svelte';

	const noAuthRoutes = ['/', 'login', 'signup'];

	onMount(() => {
		const unsubscribe = auth.onAuthStateChanged(async (user) => {
			console.log(user);
		});
	});
</script>

<slot />
