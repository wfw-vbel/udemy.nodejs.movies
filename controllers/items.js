const Item = require('../models/item');

const admin = 1;

exports.getAdminPage = (req, res, next) => {
    res.render('./admin/dashboard', {
      "pageTitle": "Admin page",
      "menu": "admin"
    });
};

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
    const item = new Item(Math.round(Math.random() * 10000), req.body.title, req.body.poster, req.body.type);
    item.save();
    res.redirect('/');
  };

  exports.getHomePage = (req, res, next) => {
    const itemCount = 6;
    Item.fetch((movies) => {
          Item.fetch((shows) => {
            res.render('home', {
              "pageTitle": "Main page",
              "menu": "home",
              "movies": movies.filter(m => m.type === 'movies').slice(-6),
              "shows": shows.filter(s => s.type === 'shows').slice(-6),
              "isAdmin": admin
          });
          }, itemCount)
        }, itemCount);
  }

  exports.getMoviesPage = (req, res, next) => {
    Item.fetch((movies) => {
            res.render('movies/movies', {
              "pageTitle": "Movies",
              "menu": "movies",
              "movies": movies.filter(m => m.type === 'movies'),
              "isAdmin": admin
          });
        })
      };

  exports.getShowsPage = (req, res, next) => {
    Item.fetch((shows) => {
            res.render('shows/shows', {
              "pageTitle": "Shows",
              "menu": "shows",
              "shows": shows.filter(s => s.type === 'shows'),
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
