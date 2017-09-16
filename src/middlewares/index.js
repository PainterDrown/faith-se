function loadMiddlewares(app) {
  // koa官方中间件
  app.use(require('koa-logger')());      // 记录http请求
  app.use(require('koa-bodyparser')());  // 处理request传来的JSON数据
  app.use(require('koa-json')());        // 处理response传回的JSON数据
  // 自己的中间件
  app.use(require('./handleError'));     // 处理错误
  app.use(require('./session')(app));    // session
  app.use(require('./CORS'));            // 解决CORS跨域问题
  app.use(require('./initParam'));       // 初始化参数
}

exports = module.exports = {
  loadMiddlewares,
};
