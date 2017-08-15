const koaLogger   = require('koa-logger')();
const errorHandler = require('./errorHandler');
const session      = require('./session');

function loadMiddlewares(app) {
  app.use(errorHandler);
  app.use(koaLogger);
  app.use(session);
}

exports = module.exports = {
  loadMiddlewares,
};
