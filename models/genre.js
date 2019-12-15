const Sequelize = require('sequelize');
const sequelize = require('../data/database');

const Genre = sequelize.define('genre', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: Sequelize.STRING
});

module.exports = Genre;