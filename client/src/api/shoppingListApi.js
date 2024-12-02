import apiClient from './axios';

// API to create a shopping list
export const createShoppingList = async (data) => {
    const response = await apiClient.post('/ShoppingLists', data);
    return response.data;
};

// API to fetch users
export const getUsers = async () => {
    const response = await apiClient.get('/users');
    return response.data;
};
