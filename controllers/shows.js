const Show = require('../models/show');

const admin = 0;

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

  exports.getShowDetailsPage = (req, res, next) => {
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