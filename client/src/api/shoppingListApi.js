import apiClient from './axios';

// Create a shopping list
export const createShoppingList = async (listData) => {
    try {
        const response = await apiClient.post('/ShoppingLists', listData);
        return response.data;
    } catch (error) {
        console.error("Error creating shopping list:", error);
        throw error;
    }
};

// Get details of a specific shopping list
export const getShoppingListDetails = async (listId) => {
    try {
        const response = await apiClient.get(`/ShoppingLists/${listId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching shopping list details:", error);
        throw error;
    }
};

// Delete a shopping list
export const deleteShoppingList = async (listId) => {
    try {
        await apiClient.delete(`/ShoppingLists/${listId}`);
        return "Shopping list deleted successfully.";
    } catch (error) {
        console.error("Error deleting shopping list:", error);
        throw error;
    }
};

// Archive a shopping list
export const archiveShoppingList = async (listId) => {
    try {
        await apiClient.patch(`/ShoppingLists/${listId}/archive`);
        return "Shopping list archived successfully.";
    } catch (error) {
        console.error("Error archiving shopping list:", error);
        throw error;
    }
};

// Unarchive a shopping list
export const unarchiveShoppingList = async (listId) => {
    try {
        await apiClient.patch(`/ShoppingLists/${listId}/unarchive`);
        return "Shopping list unarchived successfully.";
    } catch (error) {
        console.error("Error unarchiving shopping list:", error);
        throw error;
    }
};

// Get all items for a shopping list
export const getAllItemsForList = async (listId) => {
    try {
        const response = await apiClient.get(`/ShoppingLists/${listId}/items`);
        return response.data;
    } catch (error) {
        console.error("Error fetching items for list:", error);
        throw error;
    }
};

// Add an item to a shopping list
export const addItemToList = async (listId, itemData) => {
    try {
        const response = await apiClient.post(`/ShoppingLists/${listId}/items`, itemData);
        return response.data;
    } catch (error) {
        console.error("Error adding item to list:", error);
        throw error;
    }
};

// Update the quantity of an item in a shopping list
export const updateItemQuantity = async (listId, itemId, quantity) => {
    try {
        const response = await apiClient.patch(`/ShoppingLists/${listId}/items/${itemId}/quantity`, { quantity });
        return response.data;
    } catch (error) {
        console.error("Error updating item quantity:", error);
        throw error;
    }
};

// Delete an item from a shopping list
export const deleteItemFromList = async (listId, itemId) => {
    try {
        await apiClient.delete(`/ShoppingLists/${listId}/items/${itemId}`);
        return "Item deleted successfully.";
    } catch (error) {
        console.error("Error deleting item:", error);
        throw error;
    }
};

// Mark an item as purchased
export const markItemAsPurchased = async (listId, itemId) => {
    try {
        await apiClient.patch(`/ShoppingLists/${listId}/items/${itemId}/purchase`);
        return "Item marked as purchased.";
    } catch (error) {
        console.error("Error marking item as purchased:", error);
        throw error;
    }
};

// Mark an item as unpurchased
export const markItemAsUnpurchased = async (listId, itemId) => {
    try {
        await apiClient.patch(`/ShoppingLists/${listId}/items/${itemId}/unpurchase`);
        return "Item marked as unpurchased.";
    } catch (error) {
        console.error("Error marking item as unpurchased:", error);
        throw error;
    }
};
