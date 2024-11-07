<script>
    import { onMount } from 'svelte';
    import axios from 'axios';
  
    /**
     * @type {any[]}
     */
    let claimedFoodItems = [];
  
    onMount(async () => {
      await loadClaimedItems();
    });
  
    async function loadClaimedItems() {
      try {
        const res = await axios.get("/api/fooditems/client/");
        claimedFoodItems = res.data.food_items;
      } catch (err) {
        console.error('Failed to load claimed items:', err);
      }
    }
  
    /**
     * @param {any} itemId
     */
    function unclaimItem(itemId) {
      axios.patch(`/api/fooditems/claimstatus/${itemId}`, {
        client_id: null,
        is_claimed: false
      }).then(loadClaimedItems);
    }
  </script>
  
  <div class="claimed-items-container">
    {#each claimedFoodItems as item}
      <div class="claimed-item">
        <p>{item.name}</p>
        <p>{item.quantity * 3} pounds</p>
        <p>{item.quantity} people</p>
        <button on:click={() => unclaimItem(item.id)}>Unclaim</button>
      </div>
    {/each}
  </div>
  
  <style>
    @import './clientProfileCSS/ClientClaimedItems.css';
  </style>
  