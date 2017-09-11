const mysql = require('mysql');
const promisifyAll  = require('../../utils/promisifyAll');
const FaithError    = require('../../utils/FaithError');
const logger        = require('../../utils/logger');
const mysql_options = require('../../configs/mysql');

promisifyAll(require('mysql/lib/Connection').prototype);
promisifyAll(require('mysql/lib/Pool').prototype);

const pool = mysql.createPool(mysql_options);
pool.on('error', (err) => {
  throw new FaithError(0, '数据库连接失败', err.stack);
});

/**
 * 查询结果永远是[object]
 * @param  {string}   sql    sql语句
 * @param  {[string]} values sql参数
 * @return {[object]}        查询结果
 */
async function queryDb(sql, values) {
  try {
    return await pool.queryAsync(sql, values);
  } catch (err) {
    throw new FaithError(0, '数据库查询失败', err.stack);
  }
};

exports = module.exports = {
  queryDb,
};
