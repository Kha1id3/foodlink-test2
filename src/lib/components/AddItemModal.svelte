<script>
  import axios from 'axios';
  import { openSnackbar } from '$lib/stores/snackbar';

  /** @type {() => void} */
  export let toggleModal; // Define toggleModal as a void function

  /** @type {number} */
  export let vendorId;

  let name = '';
  let quantity = '';
  let set_time = '';

  /** @param {Event} e */
  async function submitItem(e) {
    e.preventDefault();
    try {
      await axios.post('/api/fooditems/', { name, quantity, set_time, vendor_id: vendorId });
      openSnackbar('Item successfully added!');
      toggleModal(); // Call toggleModal without arguments
    } catch (err) {
      console.error('Error adding item:', err);
    }
  }
</script>

<div class="modal">
  <form on:submit={submitItem}>
    <input type="text" bind:value={name} placeholder="Item name" required />
    <input type="number" bind:value={quantity} placeholder="Quantity" required />
    <input type="time" bind:value={set_time} placeholder="Pick-up time" required />
    <button type="submit">Submit</button>
    <button type="button" on:click={toggleModal}>Close</button> 
  </form>
</div>

<style>
   @import './vendorProfilesCSS/AddItemsForm.css';
</style>
