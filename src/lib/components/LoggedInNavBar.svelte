<script>
    import { goto } from '$app/navigation';
  
    export let logout;
    export let userInfo;  // Ensure this is exported to receive data from +layout.svelte
  
    const handleLogout = () => {
      logout();
      goto('/'); // Redirect to the homepage after logout
    };
  </script>
  
  <nav class="navbar">
    <ul class="nav-links">
      
      <li>
        <span class="user-info">Logged in as: {userInfo?.name || userInfo?.email || 'User'}</span>
      </li>
      <li>
        <button class="nav-button" on:click={() => goto('/landing')}>Dashboard</button>
      </li>
      <li>
        <button class="nav-button" on:click={() => goto('/vendor-profile')}>Profile</button>
      </li>
      <li>
        <button class="nav-button" on:click={() => goto('/settings')}>Settings</button>
      </li>
      <li>
        <button class="nav-button" on:click={() => goto('/about')}>About</button>
      </li>
      <li>
        <button class="nav-button" on:click={() => goto('/map')}>Map</button>
      </li>
      <li>
        <button class="nav-button logout" on:click={handleLogout}>Logout</button>
      </li>
    </ul>
  </nav>
  
  <style>
    .navbar {
      display: flex;
      justify-content: center;
      background-color: #333;
      padding: 1em;
    }
  
    .nav-links {
      display: flex;
      list-style: none;
      gap: 2em;
    }
  
    .nav-button {
      background: none;
      border: none;
      color: #fff;
      cursor: pointer;
      font-size: 1em;
      text-decoration: none;
    }
  
    .nav-button:hover {
      color: #aaa;
    }
  
    .logout {
      color: #e74c3c;
    }
  
    .logout:hover {
      color: #c0392b;
    }
  
    .user-info {
      color: #fff;
      font-weight: bold;
      margin-right: 1em;
    }
  </style>
  