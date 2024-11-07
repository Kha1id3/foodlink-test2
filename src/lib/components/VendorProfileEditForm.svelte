<script>
  import axios from 'axios';
  import { openSnackbar } from '$lib/stores/snackbar';

  
    /**
     * @type { {id: number | null, name: string | null, email: string | null, address_field: string | null}}
     */
  export let currentUser;

  let name = currentUser.name;
  let email = currentUser.email;


  async function handleSave() {
    try {
      await axios.put(`/api/users/${currentUser.id}`, { name, email });
      openSnackbar('Profile updated');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  }
</script>

<div class="edit-form">
  <input type="text" bind:value={name} placeholder="Name" />
  <input type="email" bind:value={email} placeholder="Email" />
  <button on:click={handleSave}>Save Changes</button>
</div>
