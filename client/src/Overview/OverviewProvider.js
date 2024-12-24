import { createContext, useMemo, useState, useContext, useEffect } from "react";
import { UserContext } from "../Users/UserProvider.js";
import Header from "../Detail/Header.js";
import OverviewList from "./OverviewList.js";
import Toolbar from "./Toolbar.js";
import "../Styles/OverviewProvider.css";
import {
  getUserWithLists,
  createShoppingList,
  toggleArchiveShoppingList,
  deleteShoppingList,
} from "../api/shoppingListApi";

export const OverviewContext = createContext();

function OverviewProvider({ children }) {
  const [showArchived, setShowArchived] = useState(false);
  const { loggedInUser } = useContext(UserContext);

  const [toDoListOverviewList, setToDoListOverviewList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!loggedInUser) {
      console.error("loggedInUser is null or undefined. Skipping fetch.");
      setError("No user logged in. Unable to fetch lists.");
      setToDoListOverviewList([]);
      setLoading(false);
      return;
    }

    const fetchLists = async () => {
      setLoading(true);
      try {
        console.log("Fetching lists for loggedInUser:", loggedInUser);
        const userData = await getUserWithLists(loggedInUser.id);
        console.log("Fetched user data:", userData);

        if (userData && Array.isArray(userData.shoppingLists)) {
          setToDoListOverviewList(userData.shoppingLists);
          console.log("toDoListOverviewList:", userData.shoppingLists);
        } else {
          throw new Error("Unexpected response structure from getUserWithLists.");
        }
      } catch (error) {
        console.error("Error fetching lists:", error);
        setError("Error fetching lists. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchLists();
  }, [loggedInUser]);

  const filteredToDoListList = useMemo(() => {
    const filtered = toDoListOverviewList.filter((item) => {
      console.log("Filtering item:", item);

      // Compare using loggedInUser._id and item.creator
      const isOwnedOrMember =
          item.creator === loggedInUser._id || // Match creator with ObjectId
          (item.members || []).includes(loggedInUser._id); // Match members with ObjectId

      if (showArchived) {
        return isOwnedOrMember; // Include archived lists
      }
      return isOwnedOrMember && !item.isArchived; // Exclude archived lists
    });

    console.log("FilteredToDoListList:", filtered); // Log filtered result
    return filtered;
  }, [showArchived, toDoListOverviewList, loggedInUser]);

  return (
      <>
        <Header />
        <Toolbar
            handleCreate={async (name) => {
              try {
                console.log("Creating new list with name:", name); // Debug log
                const newList = await createShoppingList({ name, members: [], loggedInUser: loggedInUser.id });

                console.log("Created list:", newList); // Log the response
                setToDoListOverviewList((current) => [...current, newList]);
              } catch (error) {
                console.error("Error creating list:", error); // Log errors
                setError("Error creating list. Please try again.");
              }
            }}
            showArchived={showArchived}
            setShowArchived={setShowArchived}
        />
        {loading ? (
            <p>Loading...</p>
        ) : error ? (
            <p className="error">{error}</p>
        ) : (
            <OverviewList
                OverviewList={filteredToDoListList}
                handleArchive={async (listId, isCurrentlyArchived) => {
                  try {
                    console.log("Toggling archive status for list with ID:", listId);

                    // Call the API to toggle archive status
                    const updatedList = await toggleArchiveShoppingList(
                        listId,
                        loggedInUser.id,
                        !isCurrentlyArchived
                    );

                    // Update the state with the modified list
                    setToDoListOverviewList((current) =>
                        current.map((item) =>
                            item._id === listId
                                ? { ...item, isArchived: updatedList.list.isArchived }
                                : item
                        )
                    );

                    console.log(
                        isCurrentlyArchived
                            ? "List unarchived successfully."
                            : "List archived successfully."
                    );
                  } catch (error) {
                    console.error("Error toggling archive status:", error);
                    setError("Error toggling archive status. Please try again.");
                  }
                }}
                handleDelete={async (listId) => {
                  try {
                    console.log("Attempting to delete list with ID:", listId); // Debug log

                    // Call the deleteShoppingList API function with loggedInUser
                    await deleteShoppingList(listId, loggedInUser.id);

                    // Update state to remove the deleted list
                    setToDoListOverviewList((current) =>
                        current.filter((item) => item._id !== listId)
                    );

                    console.log("List deleted successfully.");
                  } catch (error) {
                    console.error("Error deleting list:", error);
                    setError(
                        error.message || "Error deleting list. Please try again."
                    );
                  }
                }}
            />
        )}
      </>
  );
}
export default OverviewProvider;
