<script>
    import { goto } from '$app/navigation';
  
    /**
     * @param {string} path - The path to navigate to
     */
    const navigate = (path) => {
      goto(path);
    };
  </script>
  
  <nav class="navbar">
    <ul class="nav-links">
      <li>
        <button
          class="nav-button"
          on:click={() => navigate('/about')}
        >About Us</button>
      </li>
      <li>
        <button
          class="nav-button"
          on:click={() => navigate('/donate')}
        >Donate</button>
      </li>
      <li>
        <button
          class="nav-button"
          on:click={() => navigate('/resources')}
        >Resources</button>
      </li>
      <li>
        <button
          class="nav-button"
          on:click={() => navigate('/map')}
        >Map</button>
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
  </style>
  