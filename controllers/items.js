const Movie = require('../models/movie');
const Show = require('../models/show');

const admin = 0;
  
  exports.getHomePage = (req, res, next) => {
    const itemCount = 6;

    Promise.all([
      Movie.findAll({limit: itemCount, order: [['createdAt', 'DESC']]}),
      Show.findAll({limit: itemCount, order: [['createdAt', 'DESC']]})
    ])
    .then(items => {
      res.render('home', {
              "pageTitle": "Main page",
              "menu": "home",
              "movies": items[0],
              "shows": items[1],
              "isAdmin": admin
      })
    })
    .catch(err=>{
      console.log(err);
    });
  };


  exports.getPersonsPage = (req, res, next) => {
    res.render('stubs/wip', {
      "pageTitle": "People",
      "menu": "persons"
    });
};






exports.getFavorite = (req, res, next) => {
  req.user.getFavorite()
    .then(favorite => {
      return favorite
        .getMovies()
          .then(movies => {
            res.render('movies/movies', {
              pageTitle: "Favorites",
              "menu": "favorite",
              "movies": movies
            })
          })
          .catch(err => {
            console.log(err);
          });
    })
    .catch(err => (
      console.log(err)
    ));
};