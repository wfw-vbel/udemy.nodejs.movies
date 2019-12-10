const Item = require('../models/item');
const Movie = require('../models/movie');
const Show = require('../models/show');

const admin = 1;
  
  exports.getHomePage = (req, res, next) => {
    const itemCount = 6;
    Movie.findAll({limit: itemCount, order: [['createdAt', 'DESC']]})
      .then(movies => {
        Show.findAll({limit: itemCount})
          .then(shows => {
            res.render('home', {
              "pageTitle": "Main page",
              "menu": "home",
              "movies": movies,
              "shows": shows,
              "isAdmin": admin
            })
          })
          .catch(err => {
            console.log(err);
          })
      })
  };

  exports.getMoviesPage = (req, res, next) => {
    Movie.findAll().then(movies => {
      res.render('movies/movies', {
        "pageTitle": "Movies",
        "menu": "movies",
        "movies": movies,
        "isAdmin": admin
      });
    }).catch(err=>{
      console.log(err);
    });
  };

  exports.getShowsPage = (req, res, next) => {
    Show.findAll().then(shows => {
      res.render('shows/shows', {
        "pageTitle": "Shows",
        "menu": "shows",
        "shows": shows,
        "isAdmin": admin
      });
    }).catch(err=>{
      console.log(err);
    });
  };

  exports.getPersonsPage = (req, res, next) => {
    res.render('stubs/wip', {
      "pageTitle": "People",
      "menu": "persons"
    });
};


exports.getMovieDetailsPage = (req, res, next) => {
  const id = req.params.itemId;
  Movie.findByPk(id)
    .then(item => {
      res.render('./layouts/item-details', {
        "pageTitle": item.title,
        "menu": "movies",
        "title": item.title,
        "item": item
      });
    })
    .catch(err => {
      console.log(err);
  });
};

exports.getShowDetailsPage = (req, res, next) => {
  const id = req.params.itemId;
  Show.findByPk(id)
    .then(item => {
      res.render('./layouts/item-details', {
        "pageTitle": item.title,
        "menu": "shows",
        "title": item.title,
        "item": item
      });
    })
    .catch(err => {
      console.log(err);
  });
};