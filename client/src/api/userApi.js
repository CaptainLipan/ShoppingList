import apiClient from './axios'; // Import the Axios instance

// Fetch all users
export const getUsers = async () => {
    try {
        const response = await apiClient.get('/users');
        return response.data; // Return the list of users
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error; // Propagate the error for handling in the calling function
    }
};

// (Optional) Fetch a single user by ID
export const getUserById = async (userId) => {
    try {
        const response = await apiClient.get(`/users/${userId}`);
        return response.data; // Return user details
    } catch (error) {
        console.error(`Error fetching user ${userId}:`, error);
        throw error;
    }
};
