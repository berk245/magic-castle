<script>
    import {authHandlers} from '$lib/handlers/auth'
    import {goto} from '$app/navigation'
	let email = '';
	let password = '';
    let confirmPassword = '';
	const handleSubmit = async() => {
        if(password !== confirmPassword){
            alert('Passwords do not match')
            return
        }
        await authHandlers.signup({email, password})
        alert('Signup successful')
        goto('/login')
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
