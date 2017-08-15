const Koa = require('koa');
const app = new Koa();
const { loadMiddlewares } = require('./middlewares');
const { loadRouters }     = require('./routers');
const { logger }          = require('./utils');

loadMiddlewares(app);
loadRouters(app);

app.listen(3000);
logger.logMessage('服务端启动成功！');
