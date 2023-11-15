<script>
	import Card from '$components/Card.svelte';
	import { authStore } from '$lib/store/store';
	
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

<section class="grid p-4 gap-4 lg:grid-cols-6 md:grid-cols-4 grid-cols-2">
	{#each tricks as trick}
		<Card {trick} />
	{/each}
</section>
