// src/providers/UserProvider.js
import { createContext, useState, useEffect } from "react";
import { getAllUsers, getUserWithLists } from "../api/userApi"; // Import API functions

export const UserContext = createContext();

function UserProvider({ children }) {
  const [loggedInUser, setLoggedInUser] = useState(null); // Current logged-in user
  const [userLists, setUserLists] = useState([]); // Logged-in user's shopping lists
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Fetch all users
        const users = await getAllUsers();
        if (users.length > 0) {
          const firstUser = users[0]; // Select the first user as logged-in user
          setLoggedInUser(firstUser);

          // Fetch shopping lists for the logged-in user
          const userData = await getUserWithLists(firstUser.id);
          setUserLists(userData.shoppingLists);
        } else {
          throw new Error("No users found.");
        }
      } catch (err) {
        console.error("Error fetching users or shopping lists:", err);
        setError("Failed to fetch users or shopping lists.");
      } finally {
        setLoading(false); // Stop loading state
      }
    };

    fetchInitialData();
  }, []); // Run once on mount

  const value = {
    loggedInUser,
    userLists,
    setLoggedInUser, // Allow manual user switching if needed
  };

  if (loading) {
    return <p>Loading user data...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default UserProvider;
