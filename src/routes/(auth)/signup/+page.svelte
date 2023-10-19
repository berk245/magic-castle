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
    let confirmPassword = '';
    
	const handleSubmit = async() => {
		const serverResponse = await fetch('api/auth/signup',{
			method: 'POST',
			body: JSON.stringify({username, password, confirmPassword}),
		})
        if(!serverResponse.ok){
            alert('Error on signup')
            return
        }
		const data = await serverResponse.json()
        alert(data.result)
        goto('/login', {replaceState: true})
	};
</script>

<h2>Sign Up</h2>
<form on:submit|preventDefault={handleSubmit}>
	<div class="input-group">
		<input type="text" placeholder="Username" bind:value={username} />
		<input type="password" placeholder="Password" bind:value={password} />
        <input type="password" placeholder="Password" bind:value={confirmPassword} />
		<button type="submit">Sign Up</button>
	</div>
</form>
