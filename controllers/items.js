const Movie = require('../models/movie');
const Show = require('../models/show');
const Favorite = require('../models/fav');

const admin = 0;
  
  exports.getHomePage = (req, res, next) => {
    const itemCount = 6;

    Promise.all([
      Movie.findAll({ 
        limit: itemCount,
        order: [['createdAt', 'DESC']],
        include: [{
          model: Favorite,
          where: {userId: req.user.id},
          required:false
          }]
         }),
      Show.findAll({ 
          limit: itemCount,
          order: [['createdAt', 'DESC']],
          include: [{
            model: Favorite,
            where: {userId: req.user.id},
            required:false
            }]
           })
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
  Promise.all([
    req.user.getFavorite()
    .then(favorite => {
      return favorite.getMovies({ include: [ {
          model: Favorite,
          where: {userId: req.user.id},
          required:false
          }] 
      })
    }),
      req.user.getFavorite()
      .then(favorite => {
        return favorite.getShows({ include: [ {
            model: Favorite,
            where: {userId: req.user.id},
            required:false
            }] 
        })
      })
    ])
    .then(items => {
        res.render('home', {
          pageTitle: "Favorites",
          "menu": "favorite",
          "movies": items[0],
          "shows": items[1]
        })
          })
    .catch(err => {
      console.log(err);
    });
};