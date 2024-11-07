<script>
    import { openSnackbar } from '$lib/stores/snackbar';
    import axios from 'axios';
  
    /**
     * @type {() => void}
     */
     export let closeModal;
  
    let name = '';
    let quantity = '';
    let set_time = '';
  
    /**
     * @param {{ preventDefault: () => void; }} e
     */
    async function handleSubmit(e) {
      e.preventDefault();
      try {
        await axios.post('/api/fooditems/', { name, quantity, set_time });
        openSnackbar('Item added successfully');
        closeModal();
      } catch (error) {
        console.error('Error adding item:', error);
      }
    }
  </script>
  
  <form on:submit={handleSubmit}>
    <input type="text" bind:value={name} placeholder="Item name" required />
    <input type="number" bind:value={quantity} placeholder="Quantity" required />
    <select bind:value={set_time}>
      <option value="">Select Pick-Up Time</option>
      {#each Array.from({ length: 24 }) as _, i}
        <option value={i < 10 ? `0${i}:00` : `${i}:00`}>{i % 12 || 12}:00 {i < 12 ? 'AM' : 'PM'}</option>
      {/each}
    </select>
    <button type="submit">Add Item</button>
  </form>
  