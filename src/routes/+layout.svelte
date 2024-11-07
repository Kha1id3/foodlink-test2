<script>
    import NavBar from '$lib/components/NavBar.svelte';
    import LoggedInNavBar from '$lib/components/LoggedInNavBar.svelte';
    import { auth, logoutUser } from '$lib/stores/auth';
    import { onDestroy } from 'svelte';
  
    let authenticated = false;
    let userInfo = {};
  
    // Subscribe to the auth store
    const unsubscribe = auth.subscribe(({ isAuthenticated, userInfo: info }) => {
      authenticated = isAuthenticated;
      userInfo = info;
    });
  
    onDestroy(() => {
      unsubscribe();
    });
  
    // Logout handler
    const handleLogout = async () => {
      await logoutUser();
    };
  </script>
  
  <div class="app-layout">
    {#if authenticated}
      <LoggedInNavBar {userInfo} logout={handleLogout} />
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
  