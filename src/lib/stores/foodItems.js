import { writable } from 'svelte/store';
import { getFoodItemsByVendor, claimFoodItem, unclaimFoodItem } from '../utils/utilFoodItems';

/**
 * @typedef {Object} FoodItem
 * @property {number} id
 * @property {string} name
 * @property {string} [description]
 * @property {number} [quantity]
 * @property {string} [set_time]
 * @property {string} [vendor_name]
 * @property {boolean} is_claimed
 */

/** @typedef {{ foodItems: FoodItem[], claimedItems: FoodItem[] }} FoodItemsState */

export const foodItems = writable(/** @type {FoodItemsState} */ ({
    foodItems: [],
    claimedItems: [],
}));

/**
 * Function to fetch food items by vendor
 * @param {string} vendorId - Vendor ID
 */
export const fetchUserFoodItems = async (vendorId) => {
    try {
        const response = await getFoodItemsByVendor(vendorId);
        foodItems.update(state => ({
            ...state,
            foodItems: response.data.food_items,
        }));
    } catch (error) {
        console.error('Error fetching food items:', error);
    }
};

/**
 * Function to claim a food item
 * @param {number} itemId - Food Item ID
 */
export const claimItem = async (itemId) => {
    try {
        const response = await claimFoodItem(String(itemId));
        foodItems.update(state => ({
            ...state,
            claimedItems: [...state.claimedItems, response.data],
        }));
    } catch (error) {
        console.error('Error claiming food item:', error);
    }
};

/**
 * Function to unclaim a food item
 * @param {number} itemId - Food Item ID
 */
export const unclaimItem = async (itemId) => {
    try {
        await unclaimFoodItem(String(itemId));
        foodItems.update(state => ({
            ...state,
            claimedItems: state.claimedItems.filter(item => item.id !== itemId),
        }));
    } catch (error) {
        console.error('Error unclaiming food item:', error);
    }
};
