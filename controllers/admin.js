const Movie = require('../models/movie');
const Show = require('../models/show');

exports.getAdminPage = (req, res, next) => {
    res.render('./admin/dashboard', {
      "pageTitle": "Admin page",
      "menu": "admin"
    });
};

exports.postNewItem = (req, res, next) => {
  if (req.body.type === 'movies') {
    Movie.create({ title: req.body.title, imageUrl: req.body.poster })
    .then(res.redirect('/')).catch(err => {
      console.log(err);
    });
  }
  if (req.body.type === 'shows') {
      Show.create({ title: req.body.title, imageUrl: req.body.poster })
      .then(res.redirect('/')).catch(err => {
        console.log(err);
      });
  };
};


exports.getMovieEditPage = (req, res, next) => {
  const id = req.params.itemId;
  Movie.findByPk(id)
    .then(item => {
      console.log(item);
      console.log(item.id);
      item.type="movies";
      res.render('./admin/edit-item', {
        "pageTitle": item.title,
        "imageUrl": item.imageUrl,
        "menu": "movies",
        "title": item.title,
        "item": item
      });
    })
    .catch(err => {
      console.log(err);
  });
};


exports.getShowEditPage = (req, res, next) => {
  const id = req.params.itemId;
  Show.findByPk(id)
    .then(item => {
      item.type="shows";
      res.render('./admin/edit-item', {
        "pageTitle": item.title,
        "imageUrl": item.imageUrl,
        "menu": "shows",
        "title": item.title,
        "item": item
      });
    })
    .catch(err => {
      console.log(err);
  });
};

exports.postEditedMovie = (req, res, next) => {
  const Id = req.params.itemId;
  Movie.findByPk(Id).then(movie => {
    movie.title = req.body.title;
    movie.imageUrl = req.body.imageUrl;
    return movie.save();
  })
  .then(res.redirect('/'))
  .catch(err => {
    console.log(err);
  })
};

exports.postEditedShow = (req, res, next) => {
  const Id = req.params.itemId;
  Show.findByPk(Id).then(show => {
    show.title = req.body.title;
    show.imageUrl = req.body.imageUrl;
    return show.save();
  })
  .then(res.redirect('/'))
  .catch(err => {
    console.log(err);
  })
};

exports.postDeleteMovie = (req, res, next) =>{
  const itemId = req.params.itemId;
  Movie.destroy({where: {id: itemId}});
  res.redirect('/');
}

exports.postDeleteShow = (req, res, next) =>{
  const itemId = req.params.itemId;
  Show.destroy({where: {id: itemId}});
  res.redirect('/');
}
