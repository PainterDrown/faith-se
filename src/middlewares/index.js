const koaLogger     = require('koa-logger')();
const koaBodyparser = require('koa-bodyparser')();
const koaJson       = require('koa-json')();
const handleError          = require('./handleError');
const getSessionMiddleware = require('./session');
const preprocess           = require('./preprocess');

function loadMiddlewares(app) {
  // koa官方中间件
  app.use(koaLogger);      // 记录http请求
  app.use(koaBodyparser);  // 处理request传来的JSON数据
  app.use(koaJson);        // 处理response传回的JSON数据
  // 自己的中间件
  app.use(handleError);                // 处理错误
  app.use(getSessionMiddleware(app));  // session
  app.use(preprocess);                 // 预处理
}

exports = module.exports = {
  loadMiddlewares,
};
