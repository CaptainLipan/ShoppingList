const express = require('express');
const { getUserWithLists } = require("./controllers/userController");
const { createList } = require("./controllers/listController");
const { getListDetails } = require("./controllers/getListDetailsController");
const { deleteList } = require("./controllers/deleteListController");
const { archiveList, unarchiveList } = require("./controllers/archiveListController");
const router = express.Router();

//route for creating a list
router.post("/ShoppingLists", createList);

// Route to delete a shopping list
router.delete("/ShoppingLists/:listId", deleteList);

// Route to archive a shopping list
router.patch("/ShoppingLists/:listId/archive", archiveList);

// Route to unarchive a shopping list
router.patch("/ShoppingLists/:listId/unarchive", unarchiveList);

//route for fetching users with their posts
router.get("/users/:userId", getUserWithLists);


// Route to fetch list details
router.get("/ShoppingLists/:listId", getListDetails);





module.exports = router;
