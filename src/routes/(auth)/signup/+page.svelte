<script>
	let email = '';
	let password = '';
    let confirmPassword = '';
	const handleSubmit = async() => {
	};
</script>

<h2>Sign Up</h2>
<form on:submit|preventDefault={handleSubmit}>
	<div class="input-group">
		<input type="text" placeholder="Email" bind:value={email} />
		<input type="password" placeholder="Password" bind:value={password} />
        <input type="password" placeholder="Password" bind:value={confirmPassword} />
		<button type="submit">Sign Up</button>
	</div>
</form>
