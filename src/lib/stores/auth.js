// src/lib/stores/auth.js

import { writable } from 'svelte/store';
import axios from 'axios';
import Auth from '../utils/Auth';

/**
 * @typedef {Object} AuthUser
 * @property {number | null} id
 * @property {string | null} email
 * @property {string} name
 * @property {string} address_field
 * @property {number | null} type
 */

/**
 * @typedef {Object} AuthState
 * @property {AuthUser | null} user - The authenticated user, or null if not authenticated
 * @property {boolean} isAuthenticated - Whether the user is authenticated
 * @property {object} userInfo - Additional user information
 * @property {string | null} error - Error message, or null if no error
 */

/** @type {import('svelte/store').Writable<AuthState>} */
export const auth = writable({
    user: { id: null, email: null, name: '', address_field: '', type: null },
    isAuthenticated: false,
    userInfo: {},
    error: null,
});

/**
 * Function to receive user status and update the store
 * @param {{ user: AuthUser | null, isLoggedIn: boolean, userInfoObj: object }} user - The user information
 */
export const receiveUserStatus = (user) => {
    auth.set({
        user: user.user,
        isAuthenticated: user.isLoggedIn,
        userInfo: user.userInfoObj,
        error: null,
    });
};

/**
 * Function to check if user is authenticated
 * Updates the auth store based on the current user's status
 */
export const checkAuthenticateStatus = async () => {
    try {
        const response = await axios.get('/api/sessions/isLoggedIn');
        const userData = response.data;
        const token = Auth.getToken();

        if (userData && Auth.isUserAuthenticated() && userData.email === token) {
            receiveUserStatus({
                isLoggedIn: true,
                user: {
                    id: userData.id,
                    email: userData.email,
                    name: userData.name || '',
                    address_field: userData.address_field || '',
                    type: userData.type || null,
                },
                userInfoObj: userData,
            });
        } else {
            await logoutUser();
        }
    } catch (error) {
        auth.update((current) => ({
            ...current,
            error: error instanceof Error ? error.message : 'An unknown error occurred',
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
        receiveUserStatus({
            isLoggedIn: false,
            user: { id: null, email: null, name: '', address_field: '', type: null },
            userInfoObj: {},
        });
    } catch (error) {
        auth.update((current) => ({
            ...current,
            error: error instanceof Error ? error.message : 'An unknown error occurred',
        }));
    }
};
