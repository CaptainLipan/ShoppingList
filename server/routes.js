const express = require('express');
const { getUserWithLists } = require("./controllers/userController");
const { createList } = require("./controllers/listController");


const router = express.Router();

//route for creating a list
router.post("/ShoppingLists", createList);

//route for fetching users with their posts
router.get("/users/:userId", getUserWithLists);

//Route to fetch list details





module.exports = router;
