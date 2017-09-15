const logger   = require('../utils/logger');
const { sendJson } = require('../utils/koa');

/**
 * @description 统一的错误处理函数
 */
async function handleError(ctx, next) {
  try {
    await next();
  } catch (err) {
    logger.error(err);
    const code = err.code ? err.code : 2;
    const msg  = code !== 1 ? err.msg  : '参数错误';
    sendJson(ctx, {}, code, msg);
  }
}

exports = module.exports = handleError;
