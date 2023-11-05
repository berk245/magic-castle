<script>
	import Alert from '../../../lib/components/Alert.svelte';
	import { authHandlers } from '$lib/handlers/auth';
	import { authStore } from '$lib/store/store';

	let email = '';
	let resetFormSubmitSuccess = false;
	let submitError = false;

	const handleSubmit = async () => {
		try {
			await authHandlers.resetPassword({ email });
			resetFormSubmitSuccess = true;
		} catch (err) {
			console.log(err);
			submitError = true;
		}
	};
</script>

{#if resetFormSubmitSuccess}
	<Alert
		alertType="success"
		title="Success"
		alertMessage="Please check your email to reset your password."
		backToRoute="/login"
	/>
{:else if submitError}
	<Alert
		alertType="danger"
		title="Error"
		alertMessage="Something went wrong. Please try again."
		backToRoute="/login"
	/>
{:else}
	<form on:submit|preventDefault={handleSubmit}>
		<div class="h-screen overflow-hidden flex items-center justify-center">
			<div class="bg-white lg:w-6/12 md:7/12 w-8/12 shadow-3xl rounded-xl p-12 md:p-24">
				<div class="flex items-center text-lg mb-6 md:mb-8">
					<input
						type="text"
						id="username"
						class="bg-gray-200 rounded pl-12 py-2 md:py-4 focus:outline-none w-full"
						placeholder="Email"
						bind:value={email}
					/>
				</div>

				<button
					class="bg-gradient-to-b from-gray-700 to-gray-900 font-medium p-2 md:p-4 text-white uppercase w-full rounded"
					type="submit"
					disabled={$authStore.loading}
				>
					{#if !$authStore.loading}
						Reset Password
					{:else}
						Loading
					{/if}
				</button>
				<div class="font-small mt-4">
					<a
						href="/login"
						class="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
					>
						Back to login page
					</a>
				</div>
			</div>
		</div>
	</form>
{/if}
