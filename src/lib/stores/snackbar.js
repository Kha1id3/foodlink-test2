import { writable } from 'svelte/store';

// Define the snackbar store with an initial closed state
export const snackbar = writable({ isOpen: false, message: '' });

// Function to open the snackbar with a custom message
export function openSnackbar(message = 'Action completed') {
  snackbar.set({ isOpen: true, message });
}

// Function to close the snackbar
export function closeSnackbar() {
  snackbar.set({ isOpen: false, message: '' });
}
