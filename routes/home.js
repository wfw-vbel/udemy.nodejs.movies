const express = require('express');

const router = express.Router();
const views = "./views";

router.get('/', (req, res, next) => {
    res.render('home', {pageTitle: "Home page", path: "home"});
})

module.exports = router;