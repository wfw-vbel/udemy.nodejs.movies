const express = require('express');
const sequelize = require('./data/database');
const path = require('path');
const bodyParser = require('body-parser');

const Movie = require('./models/movie');
const Show = require('./models/show');
const User = require('./models/user');
const Favorite = require('./models/fav');
const FavoriteItem = require('./models/fav-item');
const Genre = require('./models/genre');
const MovieGenre = require('./models/movie-genre');

const app = express();
const sequelize_fixtures = require('sequelize-fixtures');

app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

const adminRouter = require('./routes/admin');
const itemsRouter = require('./routes/items');

const errorController = require('./controllers/errors');

app.use((req, res, next) => {
    User.findByPk(1)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => {
            console.log(err);
        });
});

app.use('/admin', adminRouter);
app.use(itemsRouter);
app.use(errorController.getNotFoundPage);



Movie.belongsTo(User, {foreignKey: {allowNull: true }});
Show.belongsTo(User, {foreignKey: {allowNull: true }});
User.hasOne(Favorite);
Favorite.belongsToMany(Movie, {through: FavoriteItem});
Movie.belongsToMany(Favorite, {through: FavoriteItem});
Movie.belongsToMany(Genre, {through: MovieGenre});

sequelize
    .sync(
    //     {force: true}
    // )
    // .then(() =>{
    //     sequelize_fixtures.loadFile(path.join(__dirname, 'data', 'fixtures', '*.json'),sequelize.models);
    // }
    )
    .then(result => {
        var user = User.findByPk(1);
        return user;
    })
    .then(user => {
        return user.createFavorite();
    })
    .then(user => {
        app.listen(3000);
    })    
    .catch(err => {
        console.log(err);
    })