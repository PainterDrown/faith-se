const koaLogger     = require('koa-logger')();
const koaBodyparser = require('koa-bodyparser')();
const kosJson       = require('koa-json')();
const handleError          = require('./handleError');
const getSessionMiddleware = require('./session');
const initParam            = require('./initParam');

function loadMiddlewares(app) {
  // koa官方中间件
  app.use(koaLogger);      // 记录http请求
  app.use(koaBodyparser);  // 处理request传来的JSON数据
  app.use(kosJson);        // 处理response传回的JSON数据
  // 自己的中间件
  app.use(handleError);             // 处理错误
  app.use(getSessionMiddleware());  // session
  app.use(initParam);               // 预处理request的参数数据
}

exports = module.exports = {
  loadMiddlewares,
};
