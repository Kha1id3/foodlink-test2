<script>
  import { claimItem, unclaimItem } from '../../stores/foodItems';

  /** @type {import('../../stores/foodItems').FoodItem[]} */
  export let vendorItems = [];

  /**
   * Toggle the claim status of an item
   * @param {import('../../stores/foodItems').FoodItem} item
   */
  function handleClaimToggle(item) {
    if (item.is_claimed) {
      unclaimItem(item.id);
    } else {
      claimItem(item.id);
    }
  }
</script>

<div class="vendor-items-wrapper">
  {#each vendorItems as item}
    <div class="vendor-item">
      <p>{item.name}</p>
      <p>{item.quantity} pounds</p>
      <p>Feeds {item.quantity}</p>
      <p>Pickup Time: {item.set_time}</p>
      <button on:click={() => handleClaimToggle(item)}>
        {item.is_claimed ? 'Unclaim' : 'Claim'}
      </button>
    </div>
  {/each}
</div>

<style>
  @import '../../routes/feed/css/AllFeedItemsDisplayed.css';
</style>
