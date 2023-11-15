<script>
	import Card from '$components/Card.svelte';
	import { authStore } from '$lib/store/store';
	import Spinner from '$components/Spinner.svelte';
</script>

{#if $authStore.loading}
	<Spinner />
{:else}
	<section class="grid p-4 gap-4 lg:grid-cols-6 md:grid-cols-4 grid-cols-2">
		{#each $authStore.tricks as trick}
			<Card {trick} />
		{/each}
	</section>
{/if}
