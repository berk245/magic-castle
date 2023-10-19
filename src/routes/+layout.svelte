<script>
	import { auth } from '../lib/firebase/firebase';
	import { onMount } from 'svelte';

	onMount(() => {
		const unsubscribe = auth.onAuthStateChanged(async (user) => {
            console.log(user);
		});
	});
</script>

<slot />
