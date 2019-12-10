const express = require('express');
const db = require('./data/database');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();


app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

const adminRouter = require('./routes/admin');
const itemsRouter = require('./routes/items');

const errorController = require('./controllers/errors');

app.use('/admin', adminRouter);
app.use(itemsRouter);
app.use(errorController.getNotFoundPage);

app.listen(3000);