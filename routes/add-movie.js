const express = require('express');

const views = "./views";
const router = express.Router();

const movies = [];

router.get('/', (req, res, next) => {
    res.render('movie-form',{pageTitle:'Add new movie', path: "movies"});
})

router.post('/', (req, res, next) => {
    movies.push({ title: req.body.title });
    res.redirect('/');
})

exports.routes = router;
exports.movies = movies;