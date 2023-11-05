<script>
	import Alert from '../../../lib/components/Alert.svelte';
	import { authHandlers } from '$lib/handlers/auth';
	let email = '';
	let password = '';
	let confirmPassword = '';

	let signupSuccess = false;
	let signupError = false;

	const handleSubmit = async () => {
		try {
			if (password !== confirmPassword) {
				alert('Passwords do not match');
				return;
			}
			await authHandlers.signup({ email, password });
			signupSuccess = true;
		} catch (err) {
			signupError = true;
		}
	};
</script>

{#if signupSuccess}
	<div
		class="bg-yellow-400 dark:bg-gray-800 h-screen overflow-hidden flex items-center justify-center"
	>
		<Alert
			alertType="success"
			title="Success"
			alertMessage="Signup successful. Go back to login page to login"
			backToRoute="/login"
		/>
	</div>
{:else if signupError}
	<div
		class="bg-yellow-400 dark:bg-gray-800 h-screen overflow-hidden flex items-center justify-center"
	>
		<Alert
			alertType="danger"
			title="Error"
			alertMessage="Something went wrong. Please try again."
			backToRoute="/signup"
		/>
	</div>
{:else}
	<form on:submit|preventDefault={handleSubmit}>
		<div
			class="bg-yellow-400 dark:bg-gray-800 h-screen overflow-hidden flex items-center justify-center"
		>
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
				<div class="flex items-center text-lg mb-6 md:mb-8">
					<input
						type="password"
						id="password"
						class="bg-gray-200 rounded pl-12 py-2 md:py-4 focus:outline-none w-full"
						placeholder="Password"
						bind:value={password}
					/>
				</div>
				<div class="flex items-center text-lg mb-6 md:mb-8">
					<input
						type="password"
						id="password"
						class="bg-gray-200 rounded pl-12 py-2 md:py-4 focus:outline-none w-full"
						placeholder="Confirm password"
						bind:value={confirmPassword}
					/>
				</div>
				<button
					class="bg-gradient-to-b from-gray-700 to-gray-900 font-medium p-2 md:p-4 text-white uppercase w-full rounded"
					type="submit"
				>
					Sign Up
				</button>
				<div class="font-small mt-4">
					<span
						>Already have an account? <a
							href="/login"
							class="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
							>Go to login page</a
						></span
					>
				</div>
			</div>
		</div>
	</form>
{/if}
