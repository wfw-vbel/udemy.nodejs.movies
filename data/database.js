const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'heroku_c730721ba3a5524',
    'bc69a3e8bdc150',
    '16a63097',
    {
        dialect: 'mysql',
        host: 'eu-cdbr-west-02.cleardb.net'
        ,logging: true
    });

module.exports = sequelize;