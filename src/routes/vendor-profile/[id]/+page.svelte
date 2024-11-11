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
    let businessHours: string[] = [];
    
    let foodItems: any[] = []; // Array of unclaimed food items
    let claimedItems: any[] = []; // Array of claimed food items
    let showModal = false;
    let isFavorite = false;
  
    // Ensure currentUser has a fallback structure to avoid null errors
    let currentUser = get(auth).user || { id: null, name: '', email: '', address_field: '' };
  
    // Fetch vendor data when the component is mounted
    onMount(async () => {
        await loadVendorData();
    });
  
    /**
     * Function to load vendor data from the server based on the current user's ID.
     */
    async function loadVendorData() {
        try {
            if (currentUser.id) { // Ensure there's a valid ID
                const response = await axios.get(`/api/users/vendors/${currentUser.id}`);
                const profileData = response.data;
                profilePic = profileData.profile_picture;
                vendorName = profileData.name;
                businessHours = profileData.business_hours || [];
                foodItems = profileData.food_items.filter((item: { is_claimed: any; }) => !item.is_claimed);
                claimedItems = profileData.food_items.filter((item: { is_claimed: any; }) => item.is_claimed);
            } else {
                console.error('User ID is not available');
            }
        } catch (error) {
            console.error('Error loading vendor data:', error);
            openSnackbar('Failed to load vendor data');
        }
    }
  
    /**
     * Toggles the display of the modal form for adding new items.
     */
    function toggleModal() {
        showModal = !showModal;
    }
  
    /**
     * Closes the modal form for adding new items.
     */
    function closeModal() {
        showModal = false;
    }
  
    /**
     * Toggles the favorite status and displays a snackbar notification.
     */
    function addFavorite() {
        isFavorite = !isFavorite;
        openSnackbar(isFavorite ? 'Added to favorites' : 'Removed from favorites');
    }
  
    /**
     * Marks an item as claimed by the current user.
     * @param {number} food_id - The ID of the food item to be claimed.
     */
    async function claimItem(food_id: number) {
        try {
            await axios.patch(`/api/fooditems/claimstatus/${food_id}`, { client_id: currentUser.id, is_claimed: true });
            await loadVendorData(); // Reload data to reflect changes
            openSnackbar('Item claimed');
        } catch (error) {
            console.error('Error claiming item:', error);
        }
    }
  
    /**
     * Unclaims an item that was previously claimed by the current user.
     * @param {number} food_id - The ID of the food item to be unclaimed.
     */
    async function unclaimItem(food_id: number) {
        try {
            await axios.patch(`/api/fooditems/claimstatus/${food_id}`, { client_id: null, is_claimed: false });
            await loadVendorData(); // Reload data to reflect changes
            openSnackbar('Item unclaimed');
        } catch (error) {
            console.error('Error unclaiming item:', error);
        }
    }
  </script>
  
  <div id="vendor-container">
    <div id="vendor-profile-container">
        <div class="profile-picture-container-div">
            <img id="profile-picture" src={profilePic} alt="Vendor profile picture" />
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
    <SimpleModal {closeModal}>
        <AddItemForm {closeModal} />
    </SimpleModal>
  {/if}
  
  <style>
    @import '../../../lib/components/vendorProfilesCSS/VendorProfile.css';
  </style>
  