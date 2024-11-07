<script>
    import { onMount } from 'svelte';
    import axios from 'axios';
  
    /**
     * @type {any}
     */
     export let currentUserName;
    /**
     * @type {string | any[]}
     */
    let usersFavorites = [];
    let vendorsList = [];
  
    onMount(() => {
      loadFavorites();
      loadVendors();
    });
  
    async function loadFavorites() {
      const res = await axios.get(`/api/favorites/client/${currentUserName}`);
      usersFavorites = res.data.favorites;
    }
  
    async function loadVendors() {
      const res = await axios.get(`/api/users/vendors`);
      vendorsList = res.data.vendors;
    }
  
    /**
     * @param {any} favoriteId
     */
    function deleteFavorite(favoriteId) {
      axios.delete(`/api/favorites/${favoriteId}`).then(loadFavorites);
    }
  </script>
  
  <div class="display-client-fav-container">
    {#if usersFavorites.length > 0}
      {#each usersFavorites as fav}
        <div class="display-fav-info">
          <div>{fav.vendor_name}</div>
          <div>{fav.address_field}</div>
          <div>{fav.telephone_number}</div>
          <button on:click={() => deleteFavorite(fav.id)}>Unfavorite</button>
        </div>
      {/each}
    {:else}
      <p>No favorites to display.</p>
    {/if}
  </div>
  
  <style>
    @import './clientProfileCSS/DisplayClientFavorites.css';
  </style>
  