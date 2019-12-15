const Sequelize = require('sequelize');
const sequelize = require('../data/database');

const ShowGenre = sequelize.define('showGenre', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
});

module.exports = ShowGenre;