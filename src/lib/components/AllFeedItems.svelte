<script>
  import { createEventDispatcher } from 'svelte';
  import AllFeedItemsDisplayed from './AllFeedItemsDisplayed.svelte';
  import AllFeedItemsDisplayVendorName from './AllFeedItemsDisplayVendorName.svelte';

  /** 
   * @type {{ id: number, name: string, quantity: number, set_time: string, vendor_name: string, is_claimed: boolean }[]} 
   */
  export let allFoodItems = [];

  const dispatch = createEventDispatcher();

  /**
   * Dispatches a 'claimItem' event with foodId and isClaimed status.
   * @param {number} foodId - The ID of the food item
   * @param {boolean} isClaimed - The claim status of the food item
   */
  function claim(foodId, isClaimed) {
    dispatch('claimItem', { foodId, isClaimed });
  }
</script>

<style>
  @import '../../routes/feed/css/AllFeedItems.css'; 
</style>

{#each allFoodItems as food}
  <AllFeedItemsDisplayVendorName vendorName={food.vendor_name} />
  <AllFeedItemsDisplayed {food} on:claimItem={({ detail }) => claim(detail.foodId, detail.isClaimed)} />
{/each}
