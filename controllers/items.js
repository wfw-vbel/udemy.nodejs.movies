const Movie = require('../models/movie');
const Show = require('../models/show');
const Genre = require('../models/genre');

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
      movie.getGenres().then(genres => {
        movie.genres = []
        for (const i of genres) {
          //movie.genres = movie.genres + i.name + " "
          movie.genres.push(i.name);
        }
        return movie
      })
      .then(movie => {
        item.title = movie.title;
        item.imageUrl = movie.imageUrl;
        item.description = movie.description;
        item.rating = movie.rating,
        item.genres = movie.genres
        item.summary = [
          {key: "Status", value: movie.status},
          {key: "Release Date", value: movie.release_date},
          {key: "Original language", value: movie.language},
          {key: "Duration", value: Math.floor(movie.duration/60) + "h " + movie.duration%60 + "m"},
          {key: "Budget", value: movie.budget? "$ " + movie.budget.toLocaleString(): null},
          {key: "Revenue", value: movie.budget? "$ " + movie.revenue.toLocaleString(): null}
        ]
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