<script>
    let username = '';
    let password = '';
</script>

<h2>Login</h2>
<form>
    <div class="input-group">
      <input
        type="text"
        placeholder="Username"
        bind:value={username}
      />
      <input
        type="password"
        placeholder="Password"
        bind:value={password}
      />
      <button type="submit">Login</button>
    </div>
  </form>
