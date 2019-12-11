const express = require('express');
const sequelize = require('./data/database');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const sequelize_fixtures = require('sequelize-fixtures');

app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

const adminRouter = require('./routes/admin');
const itemsRouter = require('./routes/items');

const errorController = require('./controllers/errors');

app.use('/admin', adminRouter);
app.use(itemsRouter);
app.use(errorController.getNotFoundPage);

sequelize
    .sync()
    .then(() =>{
        sequelize_fixtures.loadFile(path.join(__dirname, 'data', 'fixtures', '*.json'),sequelize.models);
    })
    .then(result => {
        // console.log(result);
        app.listen(3000);
    }).catch(err => {
        console.log(err);
    })