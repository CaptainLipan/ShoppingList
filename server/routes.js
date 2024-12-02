const express = require('express');
const { createList } = require('./controllers/createListController');

const router = express.Router();

router.post('/lists', createList);

module.exports = router;
