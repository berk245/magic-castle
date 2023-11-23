<script>
	import Card from '$components/Card.svelte';
	import { authStore } from '$lib/store/store';
	import Spinner from '$components/Spinner.svelte';
	import Modal from '../../components/Modal.svelte';

	let isModalVisible = false;

	const showModal = () => {
		isModalVisible = true
	}

	const closeModal = () => {
		isModalVisible = false
	}
</script>

{#if $authStore.loading}
	<Spinner />
{:else}
	<section class="grid p-4 gap-4 lg:grid-cols-6 md:grid-cols-4 grid-cols-2">
		<button
			on:click={showModal}
			class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
			Add New Trick
		</button>

		{#each $authStore.tricks as trick}
			<Card {trick} />
		{/each}

		{#if isModalVisible}
		<Modal {closeModal}>
			<p>This is the add new trick modal</p>
		</Modal>
		{/if}
	</section>
{/if}
