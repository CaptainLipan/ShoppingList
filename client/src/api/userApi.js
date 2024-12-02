import apiClient from './axios';

// Get user with their shopping lists
export const getUserWithLists = async (userId) => {
    try {
        const response = await apiClient.get(`/users/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user with lists:", error);
        throw error;
    }
};

// Add user to shopping list (only creator can do this)
export const addUserToShoppingList = async (listId, userId, loggedInUser) => {
    try {
        const response = await apiClient.post(`/ShoppingLists/${listId}/user/${userId}`, {
            loggedInUser,
        });
        return response.data;
    } catch (error) {
        console.error("Error adding user to shopping list:", error);
        throw error;
    }
};

// Remove user from shopping list (only creator can do this)
export const removeUserFromShoppingList = async (listId, userId, loggedInUser) => {
    try {
        await apiClient.delete(`/ShoppingLists/${listId}/user/${userId}`, {
            data: { loggedInUser },
        });
        return "User removed from shopping list.";
    } catch (error) {
        console.error("Error removing user from shopping list:", error);
        throw error;
    }
};

// User leaves shopping list
export const leaveShoppingList = async (listId, loggedInUser) => {
    try {
        await apiClient.delete(`/ShoppingLists/${listId}/leave`, {
            data: { loggedInUser },
        });
        return "User left the shopping list.";
    } catch (error) {
        console.error("Error leaving shopping list:", error);
        throw error;
    }
};
