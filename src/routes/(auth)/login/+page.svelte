<script>
	import { authHandlers } from '$lib/handlers/auth';
	import {goto} from '$app/navigation'
	let email = '';
	let password = '';

	const handleSubmit = async () => {
		await authHandlers.login({ email, password });
		goto('/dashboard')
	};
	
</script>

<h2>Login</h2>
<form on:submit|preventDefault={handleSubmit}>
	<div class="input-group">
		<input type="text" placeholder="Email" bind:value={email} />
		<input type="password" placeholder="Password" bind:value={password} />
		<button type="submit">Login</button>
	</div>
</form>
