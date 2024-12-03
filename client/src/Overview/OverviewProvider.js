import { createContext, useMemo, useState, useContext, useEffect } from "react";
import { UserContext } from "../Users/UserProvider.js";
import Header from "../Detail/Header.js";
import OverviewList from "./OverviewList.js";
import Toolbar from "./Toolbar.js";
import '../Styles/OverviewProvider.css';
import {
  getUserWithLists,
  createShoppingList,
  archiveShoppingList,
  deleteShoppingList
} from '../api/shoppingListApi'; // Import API functions

export const OverviewContext = createContext();

function OverviewProvider({ children }) {
  const [showArchived, setShowArchived] = useState(false);
  const { loggedInUser } = useContext(UserContext);

  const [toDoListOverviewList, setToDoListOverviewList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // Flag to determine if the component is still mounted

    const fetchLists = async () => {
      setLoading(true);
      try {
        console.log("Fetching lists for user:", loggedInUser); // Debug log
        const userData = await getUserWithLists(loggedInUser);
        console.log("Fetched data:", userData); // Debug log for API response

        if (isMounted) {
          if (userData && userData.shoppingLists) {
            setToDoListOverviewList(userData.shoppingLists);
          } else {
            console.error("Unexpected response structure from getUserWithLists");
          }
          setLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          console.error("Error fetching lists. Error message:", error);
          setError('Error fetching lists. Please try again later.');
          setLoading(false);
        }
      }
    };

    fetchLists();

    return () => {
      isMounted = false; // Cleanup flag on component unmount
    };
  }, [loggedInUser]);

  // Function to create a new list
  async function handleCreate(name) {
    try {
      console.log("Creating new list with name:", name); // Debug log
      const newList = await createShoppingList({ name, members: [] });
      setToDoListOverviewList((current) => [...current, newList]);
    } catch (error) {
      console.error("Error creating list:", error);
      setError("Error creating list. Please try again.");
    }
  }

  // Function to archive a list
  async function handleArchive(listId) {
    try {
      await archiveShoppingList(listId);
      setToDoListOverviewList((current) =>
          current.map((item) =>
              item._id === listId ? { ...item, state: "archived" } : item
          )
      );
    } catch (error) {
      console.error("Error archiving list:", error);
      setError("Error archiving list. Please try again.");
    }
  }

  // Function to delete a list
  async function handleDelete(listId) {
    try {
      await deleteShoppingList(listId);
      setToDoListOverviewList((current) =>
          current.filter((item) => item._id !== listId)
      );
    } catch (error) {
      console.error("Error deleting list:", error);
      setError("Error deleting list. Please try again.");
    }
  }

  // Filtered lists based on the archived state and logged-in user
  const filteredToDoListList = useMemo(() => {
    return toDoListOverviewList.filter((item) => {
      const isOwnedOrMember =
          item.owner === loggedInUser || item.memberList.includes(loggedInUser);

      if (showArchived) {
        return isOwnedOrMember;
      }
      return isOwnedOrMember && item.state === "active";
    });
  }, [showArchived, toDoListOverviewList, loggedInUser]);

  return (
      <>
        <Header />
        <Toolbar
            handleCreate={handleCreate}
            showArchived={showArchived}
            setShowArchived={setShowArchived}
        />
        {loading ? (
            <p>Loading...</p>
        ) : error ? (
            <p>{error}</p>
        ) : (
            <OverviewList
                OverviewList={filteredToDoListList}
                handleArchive={handleArchive}
                handleDelete={handleDelete}
            />
        )}
      </>
  );
}

export default OverviewProvider;
