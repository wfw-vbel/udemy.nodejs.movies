const Movie = require('../models/movie1')
const Show = require('../models/show')

const admin = 1;

exports.getAdminPage = (req, res, next) => {
    res.render('./admin/dashboard', {
      "pageTitle": "Admin page",
      "menu": "admin"
    });
};

exports.getMovieDetailsPage = (req, res, next) => {
  const movieId = req.params.movieId;
  Movie.findById(movieId, movie => {
    getDetailsPage(res, movie, "movies")
  })
};

exports.getShowDetailsPage = (req, res, next) => {
  const showId = req.params.showId;
  Show.findById(showId, show => {
    getDetailsPage(res, show, "shows")
  })
};

function getDetailsPage(res, item, menu) {  
    res.render('./layouts/item-details', {
    "pageTitle": item.title,
    "menu": menu,
    "title": item.title,
    "item": item
    });
};

exports.getMovieEditPage = (req, res, next) => {
  res.render('./admin/dashboard', {
    "pageTitle": "Edit Movie",
    "menu": "admin"
  });
};

exports.postNewItem = (req, res, next) => {
    if (req.body.type === 'mov') {
      const movie = new Movie(req.body.title, req.body.poster);
      movie.save();
    }
    else {
      const show = new Show(req.body.title, req.body.poster);
      show.save();
    }
    res.redirect('/');
  };

  exports.getHomePage = (req, res, next) => {
    const itemCount = 6;
    Movie.fetch((movies) => {
          Show.fetch((shows) => {
            res.render('home', {
              "pageTitle": "Main page",
              "menu": "home",
              "movies": movies,
              "shows": shows,
              "isAdmin": admin
          });
          }, itemCount)
        }, itemCount);
  }

  exports.getMoviesPage = (req, res, next) => {
    Movie.fetch((movies) => {
            res.render('movies/movies', {
              "pageTitle": "Movies",
              "menu": "movies",
              "movies": movies,
              "isAdmin": admin
          });
        })
      };

  exports.getMovieEditPage = (req, res, next) => {
    res.render('./admin/dashboard', {
      "pageTitle": "Edit Movie",
      "menu": "admin"
    });
  };

  exports.getShowsPage = (req, res, next) => {
    Show.fetch((shows) => {
            res.render('shows/shows', {
              "pageTitle": "Shows",
              "menu": "shows",
              "shows": shows,
              "isAdmin": admin
          });
        })
      };      

  exports.getPersonsPage = (req, res, next) => {
    res.render('stubs/wip', {
      "pageTitle": "People",
      "menu": "persons"
    });
};
