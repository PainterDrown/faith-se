const mysql = require('mysql');
const redis = require('redis');
const mysql_options = require('../configs/mysql');
const redis_options = require('../configs/redis');
const FaithError    = require('../utils/FaithError');
const logger        = require('./logger');

async function testMysql() {
  return new Promise((resolve, reject) => {
    const conn = mysql.createConnection(mysql_options);
    conn.connect(function(err) {
      if (err) {
        reject(new FaithError(0, 'MySQL数据库连接失败', err.stack));
      } else {
        logger.log('MySQL数据库连接成功');
        conn.destroy();
        resolve();
      }
    });
  });
}

async function testRedis() {
  return new Promise((resolve, reject) => {
    const client = redis.createClient(redis_options);
    client.on('connect', () => {
      logger.log('Redis连接成功')
      client.quit();
      resolve();
    })
    client.on('error', (err) => {
      reject(new FaithError(0, 'Redis连接失败', err.stack));
    });
  })
}

exports = module.exports = {
  testMysql,
  testRedis,
}
