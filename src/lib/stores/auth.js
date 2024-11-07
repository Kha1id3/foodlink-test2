import { writable } from 'svelte/store';
import axios from 'axios';
import Auth from '../utils/Auth';  // Import the Auth utility

// Store to hold authentication state
/**
 * @typedef {Object} AuthState
 * @property {{ id: number | null, email: string | null, name: string, address_field: string } | null} user - The authenticated user, initially null, expected to have id, email, name, and address_field.
 * @property {boolean} isAuthenticated - Indicates whether the user is authenticated.
 * @property {object} userInfo - Additional user information.
 * @property {string | null} error - Error message, initially null but can be a string when an error occurs.
 */

/** @type {import('svelte/store').Writable<AuthState>} */
export const auth = writable({
    user: { id: null, email: null, name: '', address_field: '' },  // Initialize user with default structure
    isAuthenticated: false,
    userInfo: {},
    error: null,
});

/**
 * Function to receive user status and update the store
 * @param {{ user: { id: number | null, email: string | null, name: string, address_field: string } | null, isLoggedIn: boolean, userInfoObj: object }} user - The user information.
 */
export const receiveUserStatus = (user) => {
    console.log("Updating auth store with:", user);  // Log to check user structure
    auth.update(() => ({
        user: user.user,  // Update the user object with id, email, name, and address_field
        isAuthenticated: user.isLoggedIn,
        userInfo: user.userInfoObj,
        error: null,
    }));
};

/**
 * Function to check if user is authenticated
 * Updates the auth store based on the current user's status
 */
export const checkAuthenticateStatus = async () => {
    try {
        const response = await axios.get('/api/sessions/isLoggedIn');
        const userData = response.data;

        const token = (typeof window !== 'undefined') ? Auth.getToken() : null;

        // If the user data from the server matches the token, set user info in the store
        if (userData.email === token) {
            receiveUserStatus({
                isLoggedIn: Auth.isUserAuthenticated(),
                user: { 
                    id: userData.id, 
                    email: userData.email,
                    name: userData.name || '',          // Ensure name is populated
                    address_field: userData.address_field || '' // Ensure address_field is populated
                },
                userInfoObj: userData,
            });
        } else {
            await logoutUser();
        }
    } catch (error) {
        const errMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        console.error('Error checking authentication status:', errMessage);
        auth.update((current) => ({
            ...current,
            error: errMessage,
        }));
    }
};

/**
 * Function to log out the user
 * Clears authentication state and deauthenticates the user
 */
export const logoutUser = async () => {
    try {
        await axios.post('/api/sessions/logout');
        Auth.deauthenticateUser();
        await checkAuthenticateStatus();
        receiveUserStatus({
            isLoggedIn: false,
            user: { id: null, email: null, name: '', address_field: '' },  // Reset user to default structure on logout
            userInfoObj: {},
        });
    } catch (error) {
        const errMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        console.error('Error logging out:', errMessage);
        auth.update((current) => ({
            ...current,
            error: errMessage,
        }));
    }
};
