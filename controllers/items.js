const Movie = require('../models/movie')
const Show = require('../models/show')

exports.getAdminPage = (req, res, next) => {
    res.render('./admin/admin-dashboard', {
      "pageTitle": "Admin page",
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
    const itemCount = 5;
    Movie.fetch((movies) => {
          Show.fetch((shows) => {
            res.render('home', {
              "pageTitle": "Main page",
              "menu": "home",
              "movies": movies,
              "shows": shows
          });
          }, itemCount)
        }, itemCount);
  }

  exports.getMoviesPage = (req, res, next) => {
    Movie.fetch((movies) => {
            res.render('movies/movies', {
              "pageTitle": "Movies",
              "menu": "movies",
              "movies": movies
          });
        })
      };

  exports.getShowsPage = (req, res, next) => {
    Show.fetch((shows) => {
            res.render('shows/shows', {
              "pageTitle": "Shows",
              "menu": "shows",
              "shows": shows
          });
        })
      };      

  exports.getPersonsPage = (req, res, next) => {
    res.render('stubs/wip', {
      "pageTitle": "People",
      "menu": "persons"
    });
};
