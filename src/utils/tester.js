const mysql = require('mysql');
const redis = require('redis');
const mysql_options = require('../configs/mysql');
const redis_options = require('../configs/redis');
const FaithError    = require('../utils/FaithError');

async function testMysql() {
  return new Promise((resolve, reject) => {
    const conn = mysql.createConnection(mysql_options);
    conn.connect(function(err) {
      if (err) {
        reject(new FaithError(0, 'MySQL数据库连接失败！', err.stack));
      }
      conn.destroy();
      resolve();
    });
  });
}

async function testRedis() {
  return new Promise((resolve, reject) => {
    const client = redis.createClient(redis_options);
    client.on('connect', () => {
      resolve();
    })
    client.on('error', (err) => {
      reject(new FaithError(0, 'Redis连接错误！', err.stack));
    });
  })
}

exports = module.exports = {
  testMysql,
  testRedis,
}
