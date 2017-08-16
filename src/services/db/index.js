const mysql = require('mysql');
const { promisifyAll, FaithError } = require('../../utils');
const { mysql: mysql_options } = require('../../config');

promisifyAll(require('mysql/lib/Connection').prototype);
promisifyAll(require('mysql/lib/Pool').prototype);

const pool = mysql.createPool(mysql_options);

/**
 * 查询结果永远是[Object]
 * @param  {String}   sql    sql语句
 * @param  {[String]} values sql参数
 * @return {[Object]}        查询结果
 */
async function queryDB(sql, values) {
  try {
    return pool.queryAsync(sql, values);
  } catch (err) {
    throw new FaithError(500, '数据库查询错误', err);
  }
};

exports = module.exports = queryDB;
