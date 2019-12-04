const express = require('express');

const router = express.Router();

const itemsController = require('../controllers/items');

router.get('/', itemsController.getHomePage);

router.get('/movies', itemsController.getMoviesPage);

router.get('/shows', itemsController.getShowsPage);

router.get('/persons', itemsController.getPersonsPage);

module.exports = router;