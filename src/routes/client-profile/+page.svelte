<script>
    import { onMount } from 'svelte';
    import { auth } from '$lib/stores/auth';
    import { get } from 'svelte/store';
    import axios from 'axios';
    import MainSnackbar from '../../lib/components/MainSnackbar.svelte';
    import ClientProfileEditForm from '../../lib/components/ClientProfileEditForm.svelte';
    import DisplayClientFavorites from '../../lib/components/DisplayClientFavorites.svelte';
    import ClientClaimedItems from '../../lib/components/ClientClaimedItems.svelte';
    import { snackbar, openSnackbar, closeSnackbar } from '$lib/stores/snackbar';
  
    let profilePic = '';
    let error = null;
  
    // Type definition for currentUser with default structure
    /** @type {{ id: number | null, name: string | null, email: string | null, address_field: string | null }} */
    let currentUser = get(auth).user || { id: null, name: null, email: null, address_field: null };
  
    // Load profile picture on mount
    onMount(async () => {
      if (currentUser?.id) {
        await loadProfilePic();
      } else {
        console.warn("No current user ID found");
      }
    });
  
    // Function to load profile picture
    async function loadProfilePic() {
      try {
        const response = await axios.get(`/api/users/${currentUser.id}`);
        profilePic = response.data.data[0]?.profile_picture || ''; // Fallback to empty string if profile_picture is undefined
      } catch (err) {
        console.error('Failed to load profile picture:', err);
        error = err instanceof Error ? err.message : 'An error occurred while loading the profile picture';
      }
    }
  </script>
  
  <!-- Main Client Profile Container -->
  <div id="client-container">
    <!-- Snackbar component with unwrapped snackbar status -->
    <MainSnackbar snackbarStatus={snackbar} receivedCloseSnackbar={closeSnackbar} />

  
    <!-- Profile Information Section -->
    <div class="main-div-displaying-detail-vendor-view-through-profile">
      <div class="profile-picture-container-div">
        <img class="profile-picture-through-client-page" alt="profile pic" src={profilePic} />
      </div>
  
      <div class="vendorNameDiv">
        <h2 class="vendor-name">{currentUser.name || 'Client Name'}</h2>
      </div>
  
      <div class="contactUsDiv">
        <h3>Contact Us</h3>
        <p class="vendorDeets">
          <span class="addressSpan">{currentUser.address_field || 'Address not available'}</span><br />
          <span class="emailSpan">{currentUser.email || 'Email not available'}</span><br />
        </p>
      </div>
  
      <!-- Edit Form Component -->
      <ClientProfileEditForm id={currentUser.id} />
    </div>
  
    <!-- Claimed Items and Favorites Section -->
    <div id="client-info-container">
      <h1 id="claimed-items-list-client">Claimed Items</h1>
      <ClientClaimedItems />
  
      <div id="favorites-wrapper">
        <h1 id="favorite-vendors-list-client">Favorite Vendors</h1>
        <DisplayClientFavorites currentUserName={currentUser.name || ''} />
      </div>
    </div>
  </div>
  
  <style>
    @import '../../lib/components/clientProfileCSS/ClientProfile.css';
  </style>
  