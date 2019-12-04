const path = require('path');

const express = require('express');

const itemController = require("../controllers/items");

const router = express.Router();

router.get('/', itemController.getAdminPage);
router.post('/add-movie', itemController.postNewItem);


module.exports = router;