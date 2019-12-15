const Sequelize = require('sequelize');
const sequelize = require('../data/database');

const MovieGenre = sequelize.define('movieGenre', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
});

module.exports = MovieGenre;