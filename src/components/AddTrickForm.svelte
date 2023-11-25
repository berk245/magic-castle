<script>
	export let user;
	import Spinner from '$components/Spinner.svelte';
	import { createNewTrick } from '$lib/handlers/db';

	let trickTitle;
	let minutes;
	let isDeckTricked = null;
	let isStanding = null;

	const handleSubmit = async () => {
        try{
            if(!user || !minutes || isDeckTricked === null || isStanding === null){
            alert('Please fill all the fields')
            return
        }
		await createNewTrick(user, {
			minutes: minutes,
			mix: isDeckTricked,
			standing: isStanding,
			title: trickTitle
		});
        }catch(err){
            alert('Something went wrong. Please try again.')
        }
        
	};
</script>

<form on:submit|preventDefault={handleSubmit}>
	<div class="bg-white shadow-3xl rounded-xl p-6">
		<div class="flex items-center text-lg mb-6 md:mb-8">
			<input
				type="text"
				class="bg-gray-200 rounded pl-12 py-2 md:py-4 focus:outline-none w-full"
				placeholder="Trick Title"
				bind:value={trickTitle} />
		</div>
		<div class="flex items-center text-lg mb-6 md:mb-8">
			<input
				type="number"
				class="bg-gray-200 rounded pl-12 py-2 md:py-4 focus:outline-none w-full"
				placeholder="Minutes #"
				bind:value={minutes} />
		</div>
		<div class="flex items-center text-lg mb-6 md:mb-8">
			<div class="w-full mr-2">
				<label for="deck-type" class="block mb-3 text-sm font-medium">Deck type</label>
				<select
					bind:value={isDeckTricked}
					id="deck-type"
					class="bg-gray-200 rounded pl-6 py-4 focus:outline-none w-full">
					<option value="" selected disabled>-</option>
					<option value={false}>Standard</option>
					<option value={true}>Tricked</option>
				</select>
			</div>

			<div class="w-full">
				<label for="seated-type" class="block mb-3 text-sm font-medium">Position</label>

				<select
					bind:value={isStanding}
					id="seated-type"
					class="bg-gray-200 rounded pl-6 py-4 focus:outline-none w-full">
					<option selected disabled value=''>-</option>
					<option value={true}>Standing</option>
					<option value={false}>Seated</option>
				</select>
			</div>
		</div>

		<button
			class="bg-gradient-to-b from-gray-700 to-gray-900 font-medium p-2 md:p-4 text-white uppercase w-full rounded"
			type="submit">
			{#if false}
				<Spinner />
			{:else}
				Add Trick
			{/if}
		</button>
	</div>
</form>
