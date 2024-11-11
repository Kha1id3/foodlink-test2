<script>
  import { auth, logoutUser } from '../stores/auth';
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';

  let user = get(auth).user ?? { id: null, name: '', email: '', address_field: '', type: null };
  let isAuthenticated = get(auth).isAuthenticated;

  $: auth.subscribe(value => {
    isAuthenticated = value.isAuthenticated;
    user = value.user ?? { id: null, name: '', email: '', address_field: '', type: null };
  });

  /**
     * @param {{ preventDefault: () => void; }} event
     */
  async function handleLogout(event) {
    event.preventDefault();
    await logoutUser();
  }
</script>

<nav id="nav">
  <ul id="nav-links">
    <li><a href="/" class="nav-link">Home</a></li>
    <li><a href="/about" class="nav-link">About Us</a></li>
    <li><a href="/donate" class="nav-link">Donate</a></li>
    <li><a href="/resources" class="nav-link">Resources</a></li>
    <li><a href="/map" class="nav-link">Map</a></li>

    {#if isAuthenticated}
      <li>Welcome, {user.name}</li>
      <li><a href={user.type === 1 ? '/vendor-profile' : '/client-profile'} class="nav-link">Profile</a></li>
      <li><button on:click={handleLogout} class="nav-link" style="cursor: pointer;">Logout</button></li>
    {:else}
      <li><a href="/auth/login" class="nav-link">Login</a></li>
      <li><a href="/auth/signup" class="nav-link">Sign Up</a></li>
    {/if}
  </ul>
</nav>

<style>
  @import './navBarCSS/NavBar.css';
</style>
