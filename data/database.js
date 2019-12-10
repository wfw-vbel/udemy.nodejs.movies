const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'datamoviz',
    password: "EXua8ups1"
});

module.exports = pool.promise();