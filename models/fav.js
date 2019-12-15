const Sequelize = require('sequelize');
const sequelize = require('../data/database');

const Favorite = sequelize.define('favorite', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    }
});

module.exports = Favorite;