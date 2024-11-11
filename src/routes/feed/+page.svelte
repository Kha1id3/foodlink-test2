<script>
  import { onMount, onDestroy } from 'svelte';
  import { foodItems, fetchUserFoodItems, claimItem, unclaimItem } from '../../lib/stores/foodItems';
  import AllFeedItems from '../../lib/components/Feed/AllFeedItems.svelte';

  /** @type {import('../../lib/stores/foodItems').FoodItem[]} */
  
  let items = []; // Array to hold the food items
  let error = null; // Error handling

  const unsubscribe = foodItems.subscribe((state) => {
    items = state.foodItems;
  });

  onMount(async () => {
    try {
      const response = await fetch('/api/foodItems'); // Fetch food items directly from the API
      if (!response.ok) throw new Error('Failed to load food items');
      const data = await response.json();
      items = data.food_items || []; // Populate `items` with fetched data
    } catch (err) {
      error = (err instanceof Error) ? err.message : 'An unknown error occurred';
      console.error('Error loading data:', err);
    }
  });

  onDestroy(() => {
    unsubscribe(); // Cleanup subscription
  });

  /**
   * Handler for claiming/unclaiming items
   * @param {number} itemId - The ID of the food item
   * @param {boolean} isClaimed - Current claimed status
   */
  async function handleClaimToggle(itemId, isClaimed) {
    try {
      if (isClaimed) {
        await unclaimItem(itemId);
      } else {
        await claimItem(itemId);
      }
      // Update local state to reflect the change
      items = items.map(item =>
        item.id === itemId ? { ...item, isClaimed: !isClaimed } : item
      );
    } catch (error) {
      console.error('Error toggling claim status:', error);
    }
  }
</script>

<div id="feed-container">
  <h1 id="feed">Available Food Items</h1>

  <!-- Pass the items and claim toggle handler to AllFeedItems component -->
  <AllFeedItems {items} on:claimToggle={(e) => handleClaimToggle(e.detail.itemId, e.detail.isClaimed)} />
</div>

<style>
  @import '../../routes/feed/css/Feed.css';
</style>
