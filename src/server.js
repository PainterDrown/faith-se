const Koa = require('koa');
const { loadMiddlewares } = require('./middlewares');
const { loadRouters }     = require('./routers');
const logger              = require('./utils/logger');
const tester              = require('./utils/tester');

async function bootstrap() {
  try {
    await tester.testMysql();
    await tester.testRedis();
    const app = new Koa();
    loadMiddlewares(app);
    loadRouters(app);
    app.listen(3000);
    logger.log('服务端程序启动成功');
  } catch(err) {
    logger.error(err);
  }
}

bootstrap();
