const express = require('express');

const router = express.Router();

const itemsController = require('../controllers/items');

router.get('/', itemsController.getHomePage);

router.get('/movies', itemsController.getMoviesPage);
router.get('/movie/:itemId', itemsController.getItemDetailsPage);
router.get('/movie/:itemId/edit', itemsController.getItemEditPage);
router.post('/movie/:itemId/', itemsController.postEditedItem);
router.post('/movie/:itemId/delete', itemsController.postDeleteItem);

router.get('/shows', itemsController.getShowsPage);
router.get('/show/:itemId', itemsController.getItemDetailsPage);
router.get('/show/:itemId/edit', itemsController.getItemEditPage);
router.post('/show/:itemId/', itemsController.postEditedItem);
router.post('/show/:itemId/delete', itemsController.postDeleteItem);

router.get('/persons', itemsController.getPersonsPage);



module.exports = router;