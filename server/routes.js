const express = require('express');
const { getUserWithLists } = require("./controllers/userController");
const { createList } = require("./controllers/listController");
const { getListDetails } = require("./controllers/getListDetailsController");
const { deleteList } = require("./controllers/deleteListController");
const { archiveList, unarchiveList } = require("./controllers/ArchiveListController");
const { addItem } = require("./controllers/AddItemController");
const { updateListName } = require("./controllers/UpdateListNameController");
const { addUserToList } = require("./controllers/AddUserToListController");
const { getListMembers } = require("./controllers/GetListMembersController");

const router = express.Router();

// Route for creating a list
router.post("/ShoppingLists", createList);

// Route to delete a shopping list
router.delete("/ShoppingLists/:listId", deleteList);

// Route to archive a shopping list
router.patch("/ShoppingLists/:listId/archive", archiveList);

// Route to unarchive a shopping list
router.patch("/ShoppingLists/:listId/unarchive", unarchiveList);

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

module.exports = router;
