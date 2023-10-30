<script>
	import { authHandlers } from '$lib/handlers/auth';
	import { goto } from '$app/navigation';
	let email = '';
	let password = '';

	const handleSubmit = async () => {
		await authHandlers.login({ email, password });
		goto('/dashboard');
	};
</script>

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
			<button
				class="bg-gradient-to-b from-gray-700 to-gray-900 font-medium p-2 md:p-4 text-white uppercase w-full rounded"
				type="submit"
			>
				Login
			</button>
			<div class="font-small mt-4">
				 <a
						href="/reset-password"
						class="underline text-blue-600 hover:text-blue-800 visited:text-purple-600">Forgot password?</a
					>
			</div>
			<div class="font-small mt-4">
				<span
					>Don't have an account? <a
						href="/signup"
						class="underline text-blue-600 hover:text-blue-800 visited:text-purple-600">Sign up</a
					></span
				>
			</div>
		</div>
	</div>
</form>
