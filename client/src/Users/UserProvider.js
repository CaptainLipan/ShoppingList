import { createContext, useState, useEffect } from "react";
import { getAllUsers, getUserWithLists } from "../api/userApi";

export const UserContext = createContext();

function UserProvider({ children }) {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [userLists, setUserLists] = useState([]);
  const [userList, setUserList] = useState([]); // Store all users
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const users = await getAllUsers(); // Fetch all users
        if (users.length > 0) {
          setUserList(users); // Populate userList with all users
          const firstUser = users[0];
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
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const value = {
    loggedInUser,
    userLists,
    userList, // Add userList to the context
    setLoggedInUser,
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
