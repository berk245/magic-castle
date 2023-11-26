<script>
	import Icon from '@iconify/svelte';
	import { deleteTrick } from '$lib/handlers/db';
	export let trick;

	const mainInfo = [
		{
			icon: 'fluent-emoji-flat:chair',
			text: trick.standing ? 'No' : 'Yes'
		},
		{
			icon: 'fxemoji:clock2oclock',
			text: trick.minutes
		},
		{
			icon: 'fxemoji:flowerplayingcards',
			text: trick.mix
		}
	];

	const handleDelete = async () => {
		await deleteTrick(trick.id);
	};
</script>

<div class="bg-slate-400 text-white rounded-md p-3">
	<p class="text-xl font-bold truncate text-center mb-2">{trick.title}</p>
	<div class="flex">
		{#each mainInfo as figure}
			<div class="flex-1 flex flex-col items-center gap-2">
				<Icon icon={figure.icon} class="text-2xl" />
				<div class="text-xl">{figure.text}</div>
			</div>
		{/each}
	</div>
	<div class="card-actions">
		<button on:click={handleDelete}>Delete</button>
	</div>
</div>
