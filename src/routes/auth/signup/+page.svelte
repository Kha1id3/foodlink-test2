<script>
  import { goto } from '$app/navigation';
  import { checkAuthenticateStatus } from '../../../lib/stores/auth';
  import Auth from '../../../lib/utils/Auth';
  import axios from 'axios';

  let email = '';
  let password = '';
  let type = 1; // 1 for Food Vendor, 2 for Non-profit
  let name = '';
  let address = '';
  let body = '';
  let telephone = '';
  let ein = ''; 
  let profilePic = '';
  let clientCertificate = '';
  let errorMessage = '';

  
    /**
   * Function to handle form submission and register user
   * @param {Event} e
   */
  const registerUser = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        email,
        password_digest: password,
        type,
        name,
        address_field: address,
        body,
        telephone_number: telephone,
        profile_pic: profilePic,
        ein: type === 1 ? ein : null,
        client_certificate: type === 2 ? clientCertificate : null,
      };

      // Send request to create new user
      await axios.post('/api/users/new', payload);

      // Store success flag and email in localStorage
      localStorage.setItem('signupSuccess', 'true');
      localStorage.setItem('signupEmail', email);  // Store the email

      // Redirect to login page
      goto('/auth/login');

    } catch (error) {
      errorMessage = 'Registration failed. Please try again.';
      console.error('Registration failed:', error);
    }
  };
</script>

<div id="signup-page">
  <h3 id="signup-header">Join FoodLink!</h3>
  <div class="choose-user-signup-form">
    <fieldset>
      <legend class="user-type">
        <p id="signup-header-body">
          Are you a food vendor or non-profit organization?
        </p>
      </legend>
      <div>
        <label>
          <input type="radio" bind:group={type} value={1} />
          Food Vendor
        </label>
        <label>
          <input type="radio" bind:group={type} value={2} />
          Non-profit Organization
        </label>
      </div>
    </fieldset>
  </div>

  <form on:submit={registerUser} class="signup-form" id={type === 1 ? 'vendor-signup-form' : 'client-signup-form'}>
    <h1 class="signup-form-header">{type === 1 ? 'Food Vendor' : 'Non-Profit Org'}</h1>

    <!-- Form fields, dynamically adjusted based on user type -->
    <div class="icon-input-field">
      <img src="/icons/auth/name.png" alt="name" class="icons" />
      <input
        required
        class="input-field"
        type="text"
        name="name"
        placeholder={type === 1 ? 'Business Name' : 'Non-Profit Name'}
        bind:value={name}
      />
    </div>
    <div class="icon-input-field">
      <img src="/icons/auth/email.png" alt="email" class="icons" />
      <input
        required
        class="input-field"
        type="text"
        name="email"
        placeholder="Email"
        bind:value={email}
      />
    </div>
    <div class="icon-input-field">
      <img src="/icons/auth/password.png" alt="password" class="icons" />
      <input
        required
        class="input-field"
        type="password"
        name="password"
        placeholder="Password"
        bind:value={password}
      />
    </div>
    <div class="icon-input-field">
      <img src="/icons/auth/address.png" alt="address" class="icons" />
      <input
        required
        class="input-field"
        type="text"
        name="address"
        placeholder="Address"
        bind:value={address}
      />
    </div>
    <div class="icon-input-field">
      <img src="/icons/auth/phone.png" alt="phone" class="icons" />
      <input
        required
        class="input-field"
        type="text"
        name="telephone"
        placeholder="Telephone Number"
        bind:value={telephone}
      />
    </div>
    <div class="icon-input-field">
      <img src="/icons/auth/profile-pic.png" alt="profile pic" class="icons" />
      <input
        required
        class="input-field"
        type="text"
        name="profilePic"
        placeholder="Profile Picture (URL)"
        bind:value={profilePic}
      />
    </div>

    <!-- Conditional Fields for Vendor and Non-Profit -->
    {#if type === 1}
      <div class="icon-input-field">
        <img src="/icons/auth/id.png" alt="id" class="icons" />
        <input
          class="input-field"
          type="text"
          name="ein"
          placeholder="Employee ID Number"
          bind:value={ein}
        />
      </div>
    {/if}

    {#if type === 2}
      <div class="icon-input-field">
        <img src="/icons/auth/certificate.png" alt="certificate" class="icons" />
        <input
          class="input-field"
          type="text"
          name="clientCertificate"
          placeholder="Client Certificate"
          bind:value={clientCertificate}
        />
      </div>
    {/if}

    <button type="submit" class="signup-button">Sign Up</button>
    {#if errorMessage}
      <p style="color: red;">{errorMessage}</p>
    {/if}
  </form>
</div>

<style>
  @import '../css/SignUp.css';
</style>
