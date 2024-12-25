import React, { createContext, useState, useEffect } from "react";
import { getShoppingListDetails } from "../api/shoppingListApi";

export const DetailContext = createContext();

function DetailProvider({ children }) {
  const [data, setData] = useState({
    memberList: [], // Ensure it's initialized to avoid undefined issues
    itemList: [], // Ensure it's initialized to avoid undefined issues
  });
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [showResolved, setShowResolved] = useState(false); // Toggle resolved state visibility

  // Extract list ID from URL
  const listId = window.location.pathname.split("/").pop();

  useEffect(() => {
    const fetchListDetails = async () => {
      setLoading(true);
      try {
        const listDetails = await getShoppingListDetails(listId); // Fetch data from the API
        if (!listDetails) {
          throw new Error("List details not found");
        }
        // Populate `data` with the fetched details
        setData({
          memberList: listDetails.memberList || [], // Default to an empty array
          itemList: listDetails.itemList || [], // Default to an empty array
          ...listDetails,
        });
      } catch (err) {
        console.error("Error fetching list details:", err);
        setError("Failed to fetch list details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchListDetails();
  }, [listId]);

  // Handlers for list actions
  const handlerMap = {
    addItem: async () => {
      if (!data) return;
      const newItem = {
        id: Math.random().toString(), // Replace with a backend-generated ID in production
        name: "",
        resolved: false,
      };
      setData((current) => ({
        ...current,
        itemList: [...current.itemList, newItem],
      }));
    },
    updateItemName: ({ id, name }) => {
      setData((current) => {
        if (!current) return current;
        return {
          ...current,
          itemList: current.itemList.map((item) =>
              item.id === id ? { ...item, name } : item
          ),
        };
      });
    },
    toggleResolveItem: ({ id }) => {
      setData((current) => {
        if (!current) return current;
        return {
          ...current,
          itemList: current.itemList.map((item) =>
              item.id === id ? { ...item, resolved: !item.resolved } : item
          ),
        };
      });
    },
    deleteItem: ({ id }) => {
      setData((current) => {
        if (!current) return current;
        return {
          ...current,
          itemList: current.itemList.filter((item) => item.id !== id),
        };
      });
    },
    addMember: ({ memberId }) => {
      setData((current) => {
        if (!current || current.memberList.includes(memberId)) return current;
        return {
          ...current,
          memberList: [...current.memberList, memberId],
        };
      });
    },
    removeMember: ({ memberId }) => {
      setData((current) => {
        if (!current) return current;
        return {
          ...current,
          memberList: current.memberList.filter((id) => id !== memberId),
        };
      });
    },
  };

  // Context value to be shared across components
  const contextValue = {
    data,
    handlerMap,
    showResolved,
    toggleShowResolved: () => setShowResolved((current) => !current),
  };

  // Conditional rendering for loading and error states
  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
      <DetailContext.Provider value={contextValue}>
        {children}
      </DetailContext.Provider>
  );
}

export default DetailProvider;
