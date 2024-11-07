<script>
    import { onMount } from 'svelte';
    import axios from 'axios';
    import { writable } from 'svelte/store';
  
    /**
     * @type {any}
     */
     export let id;
    let editProfileButton = writable(false);
    let name = '';
    let email = '';
    let address_field = '';
    let body = '';
    let telephone_number = '';
    let client_certificate = '';
  
    function toggleEditForm() {
      editProfileButton.set(!editProfileButton);
    }
  
    /**
     * @param {{ preventDefault: () => void; }} event
     */
    async function handleSubmit(event) {
      event.preventDefault();
      try {
        await axios.patch(`/api/users/${id}`, {
          name,
          email,
          address_field,
          body,
          telephone_number,
          client_certificate
        });
        // Reset form fields or display a success message if needed
      } catch (error) {
        console.error('Failed to update profile:', error);
      }
    }
  </script>
  
  <div class="ClientFormMainPage">
    <button on:click={toggleEditForm}>Edit Profile</button>
    {#if $editProfileButton}
      <form on:submit={handleSubmit} id="display-edit-form">
        <input type="text" bind:value={name} placeholder="Enter name" />
        <input type="email" bind:value={email} placeholder="Enter email" />
        <input type="text" bind:value={address_field} placeholder="Enter address" />
        <input type="text" bind:value={body} placeholder="Enter description" />
        <input type="tel" bind:value={telephone_number} placeholder="Enter phone number" />
        <input type="text" bind:value={client_certificate} placeholder="Enter client certificate" />
        <button type="submit">Submit</button>
      </form>
    {/if}
  </div>
  
  <style>
    @import './clientProfileCSS/ClientProfileEditForm.css';
  </style>
  