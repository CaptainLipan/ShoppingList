    const express = require('express');
    const { getUserWithLists, getAllUsers } = require("./controllers/userController");
    const { createList } = require("./controllers/listController");
    const { getListDetails } = require("./controllers/getListDetailsController");
    const { deleteList } = require("./controllers/deleteListController");
    const { toggleArchiveList } = require("./controllers/ArchiveListController");
    const { addItem } = require("./controllers/AddItemController");
    const { updateListName } = require("./controllers/UpdateListNameController");
    const { addUserToList } = require("./controllers/AddUserToListController");
    const { getListMembers } = require("./controllers/GetListMembersController");
    const { markItemAsPurchased, markItemAsUnpurchased } = require("./controllers/ItemStatusController");
    const { updateItemQuantity } = require("./controllers/UpdateItemQuantityController");
    const { deleteItem } = require("./controllers/DeleteItemController");
    const { updateItemName } = require("./controllers/UpdateItemNameController");
    const { deleteUserFromList } = require("./controllers/DeleteUserFromListController");
    const { leaveList } = require("./controllers/LeaveListController");
    const { getItemsForList } = require("./controllers/getItemConroller");

    const router = express.Router();

    // Route for creating a list
    router.post("/ShoppingLists", createList);

    // Route to delete a shopping list
    router.delete("/ShoppingLists/:listId", deleteList);

    // Route to archive-unArchive a shopping list
    router.patch("/ShoppingLists/:listId/archive", toggleArchiveList);

    // New route to get all users
    router.get("/users", getAllUsers);

    // Route for fetching users with their posts (lists)
    router.get("/users/:userId", getUserWithLists);

    // Route to fetch list details
    router.get("/ShoppingLists/:listId", getListDetails);

    // Route to add an item to a shopping list
    router.post("/ShoppingLists/:listId/items", addItem);

    // Route to update the name of a shopping list
    router.patch("/ShoppingLists/:listId", updateListName);

    // Route to add a user to a shopping list
    router.post("/ShoppingLists/:listId/user/:userId", addUserToList);

    // Route to get all members of a shopping list
    router.get("/ShoppingLists/:listId/members", getListMembers);

    // Route to mark an item as purchased
    router.patch("/ShoppingLists/:listId/items/:itemId/purchase", markItemAsPurchased);

    // Route to mark an item as unpurchased
    router.patch("/ShoppingLists/:listId/items/:itemId/unpurchase", markItemAsUnpurchased);

    // Route to update the quantity of an item in a shopping list
    router.patch("/ShoppingLists/:listId/items/:itemId/quantity", updateItemQuantity);

    // Route to delete an item from a shopping list
    router.delete("/ShoppingLists/:listId/items/:itemId", deleteItem);

    // Route to update the name of an item in a shopping list
    router.patch("/ShoppingLists/:listId/items/:itemId/name", updateItemName);

    // Route to get all items for a specific list (with optional search)
    router.get("/ShoppingLists/:listId/items", getItemsForList);

    // Route to remove a user from a shopping list (only creator can do this)
    router.delete("/ShoppingLists/:listId/user/:userId", deleteUserFromList);

    // Route to leave the list (for a member to leave)
    router.delete("/ShoppingLists/:listId/leave", leaveList);

    module.exports = router;