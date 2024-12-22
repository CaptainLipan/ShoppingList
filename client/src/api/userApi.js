import apiClient from './axios';

// Function to get all users
export const getAllUsers = async () => {
    try {
        const response = await apiClient.get('/users'); // Assuming this is the API endpoint to fetch all users
        return response.data; // Return the data to be used in the context or component
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error; // Throw the error so it can be caught and handled in the calling component
    }
};
// Get user with their shopping lists
export const getUserWithLists = async (userId) => {
    try {
        const response = await apiClient.get(`/users/${userId}`);

        if (response.status !== 200) {
            throw new Error(`Unexpected response status: ${response.status}`);
        }

        return response.data; // Ensure this returns the full response with `shoppingLists`
    } catch (error) {
        console.error(`Error fetching lists for user with ID ${userId}:`, error.response?.data || error.message);
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
