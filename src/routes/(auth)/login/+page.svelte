<script>
	let username = '';
	let password = '';
	const handleSubmit = () => {
		// ToDo: do login API call and get token
		const token = 'to be implemented';
		localStorage.setItem('access_token', token); // ToDo: change username to token
	};
</script>

<h2>Login</h2>
<form>
	<div class="input-group" on:submit|preventDefault={handleSubmit}>
		<input type="text" placeholder="Username" bind:value={username} />
		<input type="password" placeholder="Password" bind:value={password} />
		<button type="submit">Login</button>
	</div>
</form>
