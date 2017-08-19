// const session   = require('koa-generic-session');
const session   = require('koa-session');
const koa_redis = require('koa-redis');
const session_options = require('../configs/session')
const redis_options   = require('../configs/redis');

function getSessionMiddleware(app) {
  session_options.store = koa_redis(redis_options);
  return session(session_options, app);
}

exports = module.exports = getSessionMiddleware;
