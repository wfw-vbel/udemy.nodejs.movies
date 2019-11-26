const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname+'/public'));

app.set('view engine', 'ejs');
app.set('views', 'views');

const homeRouter = require('./routes/home');
const moviesData = require('./routes/add-movie');

const views = "./views";

app.use(homeRouter);
app.use("/movies", moviesData.routes);

app.use((req, res, next) => {
    res.status(404).render('404',{pageTitle:"Page not found", path: ""})
})

app.listen(3000);