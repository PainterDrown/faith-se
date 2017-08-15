const koaException = require('koa-exception');
const { logger } = require('../utils');

const koaExceptionHandler = koaException();

/**
 * @description 统一的错误处理函数
 */
async function errorHandler(ctx, next) {
  try {
    await next();
  } catch (err) {
    koaExceptionHandler(ctx, next);
    logger.error(err);
    mailer.reportError(err);
  }
}

exports = module.exports = errorHandler;
