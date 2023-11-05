<script>
	import { authStore } from '$lib/store/store';
	import Card from '$components/Card.svelte';

	const tricks = Array.from({ length: 20 }).map((_, i) => {
		const id = i + 1;
		return {
			id,
			title: `Trick ${id}`,
			standing: id % 2 === 0,
			minutes: Math.floor(Math.random() * 19) + 1,
			mix: id % 3 === 0 ? 'regular' : 'tricked'
		};
	});
</script>

{#if !$authStore.loading && $authStore.user}
	<h1>User dashboard</h1>
	<p>Welcome, user email: {$authStore.user}</p>
{/if}

<section class="grid p-4 gap-4 lg:grid-cols-6 md:grid-cols-4 grid-cols-2">
	{#each tricks as trick}
		<Card {trick} />
	{/each}
</section>
