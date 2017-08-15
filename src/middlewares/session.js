const session = require('koa-generic-session');
const redis   = require('koa-redis');
const { redis: redis_options }  = require('../config');

const session_middleware = session({
  store: redis(redis_options),
});

exports = module.exports = session_middleware;
