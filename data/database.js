const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'datamoviz',
    'root',
    'EXua8ups1',
    {
        dialect: 'mysql',
        host: 'localhost',
        logging: false
    });

module.exports = sequelize;