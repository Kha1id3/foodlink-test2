<script>
  import { createEventDispatcher } from 'svelte';

  /** @type {{ id: number, name: string, quantity: number, set_time: string, vendor_name: string, is_claimed: boolean }} */
  export let food;

  const dispatch = createEventDispatcher();

  function handleClaim() {
    dispatch('claimItem', { foodId: food.id, isClaimed: food.is_claimed });
  }
</script>

<style>
  @import '../../routes/feed/css/AllFeedItemsDisplayed.css'; 
</style>

<div class="display-claimed-items-for-client">
  <p class="vendor-item-name">{food.name}</p>
  <p class="vendor-weight">{food.quantity * 3} pounds</p>
  <p class="vendor-feeds">{food.quantity} people</p>
  <p class="vendor-pick-up">
    {#if Number(food.set_time.slice(0, 2)) < 13}
      {food.set_time.slice(0, 2)} am
    {:else}
      {Number(food.set_time.slice(0, 2)) - 12} pm
    {/if}
  </p>
  <button class="span-claim-button" on:click={handleClaim}>
    {food.is_claimed ? 'Unclaim' : 'Claim'}
  </button>
</div>
