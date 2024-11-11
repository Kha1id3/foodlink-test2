<script lang="ts">
  import { goto } from '$app/navigation';
  import Auth from '../../../lib/utils/Auth';
  import { checkAuthenticateStatus, auth } from '$lib/stores/auth';
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';
  import axios from 'axios';

  let email = '';
  let password = '';
  let errorMessage = '';
  let showSuccessMessage = false;

  onMount(() => {
    // Check if the user has just signed up
    if (localStorage.getItem('signupSuccess') === 'true') {
      showSuccessMessage = true;
      localStorage.removeItem('signupSuccess'); // Clear the flag
    }

    // Prefill the email field with the email from signup, if it exists
    const storedEmail = localStorage.getItem('signupEmail');
    if (storedEmail) {
      email = storedEmail;
      localStorage.removeItem('signupEmail'); // Clear it after using
    }
  });

  // Function to handle login with typed parameter for `e`
  const loginUser = async (e: Event) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/sessions/login/', { email, password_digest: password });
      if (response.data && response.data.user) {
        Auth.authenticateUser(response.data.user.email);
        await checkAuthenticateStatus();
        email = '';
        password = '';
        errorMessage = '';

        // Safely access user properties after checking if `user` exists
        const user = get(auth).user;
        if (user) {
          if (user.type === 1) {
            goto(`/vendor-profile/${user.id}`);
          } else if (user.type === 2) {
            goto('/feed');
          }
        }
      } else {
        throw new Error('No token received');
      }
    } catch (error) {
      errorMessage = 'Login failed. Please check your credentials.';
      console.error('Login failed:', error);
    }
  };

  // Redirect if already logged in
  onMount(() => {
    const user = get(auth).user;
    if (user && get(auth).isAuthenticated) {
      if (user.type === 1) {
        goto(`/vendor-profile/${user.id}`);
      } else if (user.type === 2) {
        goto('/feed');
      }
    }
  });
</script>

<div class="loginWrapper">
  {#if showSuccessMessage}
    <p style="color: green; text-align: center;">You have successfully signed up! Please log in.</p>
  {/if}
  <form on:submit={loginUser} id="login-form">
    <h1 id="login-header">Login</h1>
    <div id="login-email">
      <input required type="text" placeholder="Email" bind:value={email} />
    </div>
    <div id="login-password">
      <input required type="password" placeholder="Password" bind:value={password} />
    </div>
    <button type="submit">Login</button>
    {#if errorMessage}
      <p style="color: red;">{errorMessage}</p>
    {/if}
  </form>
</div>
<style>
  .loginWrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    min-height: 100vh;
  }
  #login-form {
    max-width: 400px;
    width: 100%;
    padding: 2rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    background-color: #fff;
  }
  #login-header {
    margin-bottom: 1rem;
    text-align: center;
  }
  input {
    width: 100%;
    padding: 0.75rem;
    margin-bottom: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  button {
    width: 100%;
    padding: 0.75rem;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: #fff;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  button:hover {
    background-color: #0056b3;
  }
</style>
