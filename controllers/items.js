const Item = require('../models/item');
const Movie = require('../models/movie');
const Show = require('../models/show');

const admin = 1;

exports.getAdminPage = (req, res, next) => {
    res.render('./admin/dashboard', {
      "pageTitle": "Admin page",
      "menu": "admin"
    });
};

//todelete
exports.getItemDetailsPage = (req, res, next) => {
  const itemId = req.params.itemId;
  Item.findById(itemId, item => {
    res.render('./layouts/item-details', {
      "pageTitle": item.title,
      "menu": item.type,
      "title": item.title,
      "item": item
  })
  })
};

exports.getMovieDetailsPage = (req, res, next) => {
  const id = req.params.itemId;
  Movie.findById(id)
    .then(([item]) => {
      console.log(item);
      res.render('./layouts/item-details', {
        "pageTitle": item[0].title,
        "menu": item[0].type,
        "title": item[0].title,
        "item": item[0]
      });
    })
    .catch(err => {
      console.log(err);
  });
};

exports.getItemEditPage = (req, res, next) => {
  const itemId = req.params.itemId;
  Item.findById(itemId, item => {
 res.render('./admin/edit-item', {
    "pageTitle": item.title + " (edit)",
    "menu": item.type,
    "item": item
    });
  });
};

exports.postEditedItem = (req, res, next) => {
  const itemId = req.params.itemId;
  console.log("id: "+ itemId);
  item = new Item(itemId, req.body.title, req.body.poster, req.body.type);
  item.saveChanges();
  res.redirect('/');
};

exports.postDeleteItem = (req, res, next) =>{
  const itemId = req.params.itemId;
  Item.deleteById(itemId);
  res.redirect('/');
}

exports.postNewItem = (req, res, next) => {
    const item = new Item(req.body.title, req.body.poster, req.body.type);
    item.save().then(() => {
      res.redirect('/');
      })
      .catch(err=> {
        console.log(err);
      })
  };
  
  exports.getHomePage = (req, res, next) => {
    const itemCount = 6;
    Item.fetch(itemCount)
      .then(([rows, fieldData]) => {
        res.render('home', {
          "pageTitle": "Main page",
          "menu": "home",
          "movies": rows.filter(i => i.type === 'movies').splice(-itemCount),
          "shows": rows.filter(i => i.type === 'shows').splice(-itemCount),
          "isAdmin": admin
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  exports.getMoviesPage = (req, res, next) => {
    Movie.fetch()
      .then(([rows, fieldData]) => {
        res.render('movies/movies', {
          "pageTitle": "Movies",
          "menu": "movies",
          "movies": rows,
          "isAdmin": admin
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  exports.getShowsPage = (req, res, next) => {
    Show.fetch()
      .then(([rows, fieldData]) => {
        res.render('shows/shows', {
          "pageTitle": "Shows",
          "menu": "shows",
          "shows": rows,
          "isAdmin": admin
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  exports.getPersonsPage = (req, res, next) => {
    res.render('stubs/wip', {
      "pageTitle": "People",
      "menu": "persons"
    });
};
