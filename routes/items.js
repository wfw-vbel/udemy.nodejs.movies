const express = require('express');

const router = express.Router();

const itemsController = require('../controllers/items');

router.get('/', itemsController.getHomePage);

router.get('/movies', itemsController.getMoviesPage);
router.get('/movie/:itemId', itemsController.getMovieDetailsPage);
router.post('/movie/:itemId/favorite', itemsController.postFavoriteMovie);


router.get('/shows', itemsController.getShowsPage);
router.get('/show/:itemId', itemsController.getShowDetailsPage);


router.get('/persons', itemsController.getPersonsPage);

router.get('/favorite', itemsController.getFavorite);



module.exports = router;