// src/lib/utils/utilFoodItems.js
import axios from 'axios';

/**
 * Get food items by vendor
 * @param {string} name - The name of the vendor
 * @returns {Promise<any>} - Axios response promise
 */
export const getFoodItemsByVendor = (name) => {
    return axios.get(`/api/fooditems/vendor/${name}`);
};

/**
 * Claim a food item
 * @param {string} itemId - Food Item ID
 * @returns {Promise<any>} - Axios response promise
 */
export const claimFoodItem = (itemId) => {
    return axios.post(`/api/fooditems/${itemId}/claim`);
};

/**
 * Unclaim a food item
 * @param {string} itemId - Food Item ID
 * @returns {Promise<any>} - Axios response promise
 */
export const unclaimFoodItem = (itemId) => {
    return axios.post(`/api/fooditems/${itemId}/unclaim`);
};
