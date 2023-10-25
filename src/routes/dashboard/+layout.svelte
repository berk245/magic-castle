<script>
	import { authHandlers } from '$lib/handlers/auth';
</script>

<div class="header">
	<button on:click={authHandlers.signout}>Signout</button>
</div>
<slot />
