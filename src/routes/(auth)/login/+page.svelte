<script>
    import { onMount } from 'svelte';
    import {goto} from '$app/navigation'

    onMount(() => {
        // Redirect to home page if access token is present  
        const token = localStorage.getItem('access_token')
        if(token) goto('/')
    })

	let username = '';
	let password = '';
	const handleSubmit = async() => {
		const serverResponse = await fetch('api/auth/login',{
			method: 'POST',
			body: JSON.stringify({username, password}),
		})
		const data = await serverResponse.json()
		localStorage.setItem('access_token', data.access_token);
        goto('/', {replaceState: true})
	};
</script>

<h2>Login</h2>
<form on:submit|preventDefault={handleSubmit}>
	<div class="input-group">
		<input type="text" placeholder="Username" bind:value={username} />
		<input type="password" placeholder="Password" bind:value={password} />
		<button type="submit">Login</button>
	</div>
</form>
