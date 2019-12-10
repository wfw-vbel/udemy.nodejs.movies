const Sequielize = require('sequelize');
const sequelize  = require('../data/database');

const Movie = sequelize.define('movies', {
    id: {
        type: Sequielize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequielize.STRING,
        allowNull: false
    },
    imageUrl: Sequielize.STRING
});

module.exports = Movie;