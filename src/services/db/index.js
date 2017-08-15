const mysql = require('mysql');
const { mysql: mysql_options } = require('../../config');

const pool = mysql.createPool(mysql_options);

async function queryDB(sql, values) {

};

exports = module.exports = queryDB;
