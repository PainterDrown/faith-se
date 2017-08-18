const session   = require('koa-generic-session');
const koa_redis = require('koa-redis');
const redis_options = require('../configs/redis');

function getSessionMiddleware() {
  return session({
    store: koa_redis(redis_options),
  });
}

exports = module.exports = getSessionMiddleware;
