<script lang="ts">
  import { onMount } from 'svelte';
  import { auth } from '$lib/stores/auth';
  import { snackbar, openSnackbar } from '$lib/stores/snackbar';
  import axios from 'axios';
  import { get } from 'svelte/store';

  // Import components
  import AddItemForm from '$lib/components/AddItemForm.svelte';
  import SimpleModal from '$lib/components/SimpleModal.svelte';
  import VendorProfileEditForm from '$lib/components/VendorProfileEditForm.svelte';

  let profilePic = '';
  let vendorName = '';
  let totalFoodDonated = 75; // Static data for display purposes
  let businessHours = [];

  interface FoodItem {
      name: string;
      quantity: number;
      feeds: string;
      food_id: number;
      set_time: string;
      vendor_name: string;
      is_claimed: boolean;
  }

  let foodItems: FoodItem[] = [];
  let claimedItems: FoodItem[] = [];
  let showModal = false;
  let isFavorite = false;
  let currentUser = get(auth).user || { id: null, name: '', email: '', address_field: '' };

  onMount(async () => {
      await loadVendorData();
  });

  async function loadVendorData() {
      try {
          const profileData = await axios.get(`/api/users/vendors/${currentUser.id}`);
          profilePic = profileData.data.profile_picture;
          vendorName = profileData.data.name;
          businessHours = profileData.data.business_hours;
          foodItems = profileData.data.food_items.filter((item: FoodItem) => !item.is_claimed);
          claimedItems = profileData.data.food_items.filter((item: FoodItem) => item.is_claimed);
      } catch (error) {
          console.error('Error loading vendor data:', error);
      }
  }

  function toggleModal() {
      showModal = !showModal;
  }

  function closeModal() {
      showModal = false;
  }

  function addFavorite() {
      isFavorite = !isFavorite;
      openSnackbar(isFavorite ? 'Added to favorites' : 'Removed from favorites');
  }

  // Claim and Unclaim functions
  async function claimItem(food_id: number) {
      try {
          await axios.patch(`/api/fooditems/claimstatus/${food_id}`, { client_id: currentUser.id, is_claimed: true });
          await loadVendorData();
          openSnackbar('Item claimed');
      } catch (error) {
          console.error('Error claiming item:', error);
      }
  }

  async function unclaimItem(food_id: number) {
      try {
          await axios.patch(`/api/fooditems/claimstatus/${food_id}`, { client_id: null, is_claimed: false });
          await loadVendorData();
          openSnackbar('Item unclaimed');
      } catch (error) {
          console.error('Error unclaiming item:', error);
      }
  }
</script>

<div id="vendor-container">
  <div id="vendor-profile-container">
      <div class="profile-picture-container-div">
          <img id="profile-picture" src={profilePic} alt="" aria-label="Vendor profile picture" />
      </div>
      <div class="vendor-info-display">
          <h2 id="vendor-name">{vendorName}</h2>
          <h1 id="vendor-people-fed-count">{totalFoodDonated}</h1>
          <p id="vendor-people-fed">pounds of food donated</p>
          <button class="add-item-button" on:click={toggleModal}>Add Item</button>
          <button on:click={addFavorite}>{isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}</button>
      </div>
      <div class="contact-info">
          <p>Contact: {currentUser.email}</p>
      </div>
  </div>

  <div id="vendor-info-container">
      <h3 id="donation-list-vendor">Donation List</h3>
      <div class="donationsListVendorContainer">
          <div id="vendor-items-header-vendor">
              <span>Food Item</span>
              <span>Weight</span>
              <span>Feeds</span>
              <span>Pick Up Time</span>
          </div>
          {#each foodItems as item (item.food_id)}
              <div id="display-unclaimed-items">
                  <div>{item.name}</div>
                  <div>{item.quantity} pounds</div>
                  <div>{item.feeds}</div>
                  <div>{item.set_time}</div>
                  <button on:click={() => claimItem(item.food_id)}>Claim</button>
              </div>
          {/each}
      </div>

      <h3 id="claimed-items-list-vendor">Claimed Items</h3>
      <div class="claimedListVendorContainer">
          {#each claimedItems as item (item.food_id)}
              <div id="display-claimed-items">
                  <div>{item.name}</div>
                  <div>{item.quantity} pounds</div>
                  <div>{item.feeds}</div>
                  <div>{item.set_time}</div>
                  <button on:click={() => unclaimItem(item.food_id)}>Unclaim</button>
              </div>
          {/each}
      </div>
  </div>
</div>

{#if showModal}
  <!-- svelte-ignore missing-declaration -->
  <SimpleModal {closeModal}>
      <AddItemForm {closeModal} />
  </SimpleModal>
{/if}

<style>
  @import '../../lib/components/vendorProfilesCSS/VendorProfile.css';
</style>
