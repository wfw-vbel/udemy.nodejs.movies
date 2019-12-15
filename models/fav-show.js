const Sequelize = require('sequelize');
const sequelize = require('../data/database');

const FavoriteShow = sequelize.define('favoriteShow', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
});

module.exports = FavoriteShow;