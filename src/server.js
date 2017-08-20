const Koa = require('koa');
const { loadMiddlewares } = require('./middlewares');
const { loadRouters }     = require('./routers');
const logger              = require('./utils/logger');
const tester              = require('./utils/tester');
const server_config      = require('./configs/server');

async function bootstrap() {
  try {
    await tester.testMysql();
    await tester.testRedis();
    const app = new Koa();
    loadMiddlewares(app);
    loadRouters(app);
    app.on('error', (err) => {
      logger.error(err);
    });
    app.listen(server_config.port);
    logger.log(`服务端程序正在监听${server_config.port}端口`);
  } catch(err) {
    logger.error(err);
  }
}

bootstrap();
