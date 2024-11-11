<script>
  import { createEventDispatcher } from 'svelte';

  /**
   * @type {any[]}
   */
  export let items = []; // Accepts an array of food items
  const dispatch = createEventDispatcher();

  /**
   * Toggle claim status for an item
   * @param {number} foodId - The ID of the food item
   * @param {boolean} isClaimed - The current claim status
   */
  function toggleClaim(foodId, isClaimed) {
    dispatch('claimToggle', { itemId: foodId, isClaimed }); // Dispatch event for claim/unclaim
  }
</script>

<div class="all-items">
  {#each items as food}
    <div class="item-card">
      <h2>{food.name}</h2>
      <p>{food.description}</p>
      <p>Weight: {food.weight} lbs</p>
      <p>Pickup Time: {food.pickup_time}</p>
      <button on:click={() => toggleClaim(food.id, food.isClaimed)}>
        {food.isClaimed ? 'Unclaim' : 'Claim'}
      </button>
    </div>
  {/each}
</div>

<style>
  @import '../../../routes/feed/css/AllFeedItems.css';
</style>
