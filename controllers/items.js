const Movie = require('../models/movie');
const Show = require('../models/show');

const admin = 0;
  
  exports.getHomePage = (req, res, next) => {
    const itemCount = 6;
    Movie.findAll({limit: itemCount, order: [['createdAt', 'DESC']]})
      .then(movies => {
        Show.findAll({limit: itemCount, order: [['createdAt', 'DESC']]})
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
  let item = {};
  Movie.findByPk(id)
    .then(movie => {
      item.title = movie.title;
      item.imageUrl = movie.imageUrl;
      item.description = movie.description;
      item.summary = [
        {key: "Status", value: movie.status},
        {key: "Release Date", value: movie.release_date},
        {key: "Original language", value: movie.language},
        {key: "Duration", value: Math.floor(movie.duration/60) + "h " + movie.duration%60 + "m"},
        {key: "Budget", value: "$ " + movie.budget.toLocaleString()},
        {key: "Revenue", value: "$ " + movie.revenue.toLocaleString()}
      ]
      console.log(item)
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

exports.postFavoriteMovie = (req, res, next) => {
  const itemId = req.params.itemId;
  console.log("itemid = " + itemId);
  let fetchedFavorites;
  req.user.getFavorite()
    .then(favorite =>{
      fetchedFavorites = favorite;
      return favorite.getMovies({where: {id: itemId}});
    })
    .then(items => {
      let item;
      if (items.length > 0) {
        item = items[0];
      }
      if (item){
        console.log("try to destroy");
        return item.favoriteItem.destroy();
      }
      return Movie.findByPk(itemId)
        .then(item => {
          console.log("try to add");
          return fetchedFavorites.addMovie(item);
        })
        .catch(err => {
          console.log(err);
        })
    })
    .then(() => {
      console.log("REFRESH");
      res.redirect('back')}
      )
    .catch(err => {
      console.log(err);
    });
};