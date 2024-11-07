<script>
  import { onMount } from 'svelte';
  import AllFeedItems from '$lib/components/AllFeedItems.svelte';
  import { snackbar, openSnackbar } from '$lib/stores/snackbar';
  import { auth } from '$lib/stores/auth';
  import { createEventDispatcher } from 'svelte';

  /** @type {{ id: number, name: string, quantity: number, set_time: string, vendor_name: string, is_claimed: boolean }[]} */
  let allFoodItems = [];  // Adding explicit type for array of food items
  /** @type {string | null} */
  let error = null;

  const dispatch = createEventDispatcher();

  onMount(async () => {
    try {
      const response = await fetch('/api/foodItems');
      if (!response.ok) throw new Error('Failed to load food items');
      const data = await response.json();
      allFoodItems = data.food_items || [];
    } catch (err) {
      error = (err instanceof Error) ? err.message : 'An unknown error occurred';
      console.error('Error loading data:', err);
    }
  });

  /**
   * @param {{ detail: { foodId: number; isClaimed: boolean }}} event
   */
  function claimItem(event) {
    const { foodId, isClaimed } = event.detail;
    fetch(`/api/fooditems/claimstatus/${foodId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: isClaimed ? null : $auth.user?.id || null,
        is_claimed: !isClaimed
      })
    })
    .then(() => openSnackbar())
    .catch(err => console.error('Error claiming item:', err));
  }
</script>

<style>
  @import '../../routes/feed/css/Feed.css'; 
</style>

<div class="feedWrapper">
  {#if error}
    <p>{error}</p>
  {:else}
    <AllFeedItems {allFoodItems} on:claimItem={claimItem} />
  {/if}
</div>
