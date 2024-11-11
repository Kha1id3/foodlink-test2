<script>
  import NavBar from '$lib/components/NavBar.svelte';
  import LoggedInNavBar from '$lib/components/LoggedInNavBar.svelte';
  import { auth, logoutUser } from '$lib/stores/auth';
  import { onDestroy } from 'svelte';

  let authenticated = false;
  let userInfo = {};

  // Subscribe to auth store to get user information
  const unsubscribe = auth.subscribe(({ isAuthenticated, userInfo: info }) => {
    authenticated = isAuthenticated;
    userInfo = info;
  });

  onDestroy(() => {
    unsubscribe();
  });

  // Logout handler function
  const handleLogout = async () => {
    await logoutUser();
  };
</script>

<div class="app-layout">
  {#if authenticated}
    <LoggedInNavBar {userInfo} on:logout={handleLogout} />
  {:else}
    <NavBar />
  {/if}

  <main>
    <slot />
  </main>
</div>

<style>
  .app-layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  main {
    flex-grow: 1;
    padding: 1rem;
  }
</style>
