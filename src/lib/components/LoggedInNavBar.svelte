<script>
  import { auth, logoutUser } from '../stores/auth';
  import { get } from 'svelte/store';
  import { goto } from '$app/navigation';

  let user = get(auth).user ?? { id: null, name: '', email: '', address_field: '', type: null };
  export let userInfo;

  $: auth.subscribe(value => {
    user = value.user ?? { id: null, name: '', email: '', address_field: '', type: null };
  });

  async function handleLogout() {
    await logoutUser();
    goto('/');
  }
</script>

<nav id="nav">
  <ul id="nav-links">
    <li>
      <span class="user-info">Logged in as: <strong>{userInfo?.name || userInfo?.email || 'User'}</strong></span>
    </li>
    <li><a href="/" class="nav-link">Home</a></li>
    <li>
      <a href="{user.type === 1 ? `/vendor-profile/${user.id}` : '/client-profile'}" class="nav-link">
        Profile
      </a>
    </li>
    <li><a href="/donations" class="nav-link">My Donations</a></li>
    <li><a href="/favorites" class="nav-link">Favorites</a></li>
    <li><a href="/settings" class="nav-link">Settings</a></li>
    <li><button on:click={handleLogout} id="logout-button" class="nav-link">Logout</button></li>
  </ul>
</nav>

<style>
  @import './navBarCSS/NavBar.css';
</style>
