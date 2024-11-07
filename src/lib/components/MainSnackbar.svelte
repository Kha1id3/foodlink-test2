<script>
  import { writable } from 'svelte/store';

  export let snackbarStatus = writable({ isOpen: false });
  /**
     * @type {() => void}
     */
   export let receivedCloseSnackbar;

  function closeSnackbar() {
    snackbarStatus.set({ isOpen: false });
    if (receivedCloseSnackbar) receivedCloseSnackbar();
  }
</script>

<div>
  {#if $snackbarStatus.isOpen}
    <div class="snackbar">
      <p>Your request has been submitted</p>
      <button on:click={closeSnackbar}>Close</button>
    </div>
  {/if}
</div>

<style>
  .snackbar {
    position: fixed;
    bottom: 1rem;
    left: 1rem;
    background-color: #333;
    color: white;
    padding: 1rem;
    border-radius: 5px;
  }
</style>
