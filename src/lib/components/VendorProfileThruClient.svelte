<script>
    import { onMount } from 'svelte';
    import axios from 'axios';
    import { auth } from '$lib/stores/auth';
    import { snackbar, openSnackbar } from '$lib/stores/snackbar';
    import { get } from 'svelte/store';
  
    /** @type {{ day: string, open: string, close: string }[]} */
    let businessHours = [];
    /** @type {{ id: number, name: string, quantity: number, set_time: string, vendor_name: string, is_claimed: boolean }[]} */
    let foodItems = [];
    let allVendors = [];
    let profilePic = '';
    let vendorName = '';
    let isFavorite = false;
    let currentUser = get(auth).user || { id: null, name: '', email: '', address_field: '' };
  
    onMount(async () => {
      await getVendorDetails();
      await getBusinessHours();
      await getFoodItems();
      await checkIfFavorite();
    });
  
    async function getVendorDetails() {
      const { data } = await axios.get('/api/users/vendors');
      allVendors = data.vendors;
      const vendor = allVendors.find((/** @type {{ id: number | null; }} */ vendor) => vendor.id === currentUser.id);
      if (vendor) {
        profilePic = vendor.profile_picture;
        vendorName = vendor.name;
      }
    }
  
    async function getBusinessHours() {
      const response = await axios.get(`/api/business_hours/${currentUser.id}`);
      businessHours = response.data.data;
    }
  
    async function getFoodItems() {
      const { data } = await axios.get(`/api/fooditems/vendor/${currentUser.id}`);
      foodItems = data.food_items;
    }
  
    async function checkIfFavorite() {
      const { data } = await axios.get(`/api/favorites/${currentUser.id}`);
      isFavorite = data.favorites.some((/** @type {{ vendor_id: number | null; }} */ fav) => fav.vendor_id === currentUser.id);
    }
  
    async function addFavorite() {
      await axios.post('/api/favorites', {
        client_id: currentUser.id,
        vendor_id: currentUser.id
      });
      isFavorite = true;
      openSnackbar('Vendor added to favorites');
    }
  
    async function removeFavorite() {
      await axios.delete(`/api/favorites/${currentUser.id}`);
      isFavorite = false;
      openSnackbar('Vendor removed from favorites');
    }
  
    /**
     * @param {number} id
     * @param {boolean} isClaimed
     */
    async function toggleClaimItem(id, isClaimed) {
      await axios.patch(`/api/fooditems/claimstatus/${id}`, {
        client_id: isClaimed ? null : currentUser.id,
        is_claimed: !isClaimed
      });
      await getFoodItems();
      openSnackbar(isClaimed ? 'Item unclaimed' : 'Item claimed');
    }
  </script>
  
  <div class="vendor-profile">
    <div class="profile-picture-container-div">
      <img src={profilePic} alt={vendorName} class="profile-picture-through-client-page" />
    </div>
  
    <div class="vendor-details">
      <h2>{vendorName}</h2>
      <button on:click={isFavorite ? removeFavorite : addFavorite}>
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
      <div class="contact-info">
        <p>Contact: {currentUser.email}</p>
      </div>
    </div>
  
    <div class="business-hours">
      <h3>Business Hours</h3>
      <table>
        <thead>
          <tr><th>Day</th><th>Hours</th></tr>
        </thead>
        <tbody>
          {#each businessHours as { day, open, close }}
            <tr>
              <td>{day}</td>
              <td>{open} - {close}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  
    <div class="donation-items">
      <h3>Donation Items</h3>
      <div class="item-list">
        {#each foodItems.filter(item => !item.is_claimed) as item}
          <div class="item">
            <p>{item.name} - {item.quantity} servings</p>
            <button on:click={() => toggleClaimItem(item.id, item.is_claimed)}>Claim</button>
          </div>
        {/each}
      </div>
    </div>
  
    <div class="claimed-items">
      <h3>Claimed Items</h3>
      <div class="item-list">
        {#each foodItems.filter(item => item.is_claimed) as item}
          <div class="item">
            <p>{item.name} - {item.quantity} servings</p>
            <button on:click={() => toggleClaimItem(item.id, item.is_claimed)}>Unclaim</button>
          </div>
        {/each}
      </div>
    </div>
  </div>
  
  <style>
    /* Vendor profile styling */
    .vendor-profile { padding: 1em; }
    .profile-picture-container-div { display: flex; justify-content: center; }
    .vendor-details { text-align: center; }
    .business-hours, .donation-items, .claimed-items { margin-top: 1em; }
    .item-list { display: flex; flex-direction: column; gap: 0.5em; }
  </style>
  