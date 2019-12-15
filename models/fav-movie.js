const Sequelize = require('sequelize');
const sequelize = require('../data/database');

const FavoriteMovie = sequelize.define('favoriteMovie', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
});

module.exports = FavoriteMovie;