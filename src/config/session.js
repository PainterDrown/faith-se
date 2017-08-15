const KoaRedis = require('koa-redis');
const { redis: redis_options } = require('./redis');

const session_options = {
  key: 'faith-session-id',
  httpOnly: true,  // 防止脚本攻击
  secure: false,   // 如果为true，则只允许https传输
  secret: 'wo-yao-chen-wei-yi-ge-cheng-gong-de-da-qi-ye-jia',
  path: '/',
  maxAge: 24 * 60 * 60 * 1000,
  store: new KoaRedis(redis_options),
};

exports = module.exports = session_options;
