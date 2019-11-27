const express = require('express');

const moviesData = require('./add-movie')

const router = express.Router();
const views = "./views";

router.get('/', (req, res, next) => {
    res.render('home', {
        pageTitle: "Home page",
        movies: moviesData.movies,
        path: "home"});
})

module.exports = router;