<script>
  /** @type {string} */
  export let vendorName;
  export let profilePicture = '';  // Optional, assuming it might not always be present
</script>

<style>
  @import '../../routes/feed/css/AllFeedItemsDisplayVendorName.css'; 
</style>

<div class="vendor-span-container">
  <span class="display-item-name">{vendorName}</span>
  {#if profilePicture}
    <img src={profilePicture} alt="{vendorName} profile picture" class="vendor-account-profile-pic" />
  {/if}
</div>
