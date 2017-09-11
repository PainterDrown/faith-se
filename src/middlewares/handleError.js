const logger   = require('../utils/logger');
const sendJson = require('../utils/sendJson');

/**
 * @description 统一的错误处理函数
 */
async function handleError(ctx, next) {
  try {
    await next();
  } catch (err) {
    logger.error(err);
    const code = err.code ? err.code : 0;
    const msg  = code !== 0 ? err.msg  : '服务器内部错误';
    sendJson(ctx, {}, code, msg);
  }
}

exports = module.exports = handleError;
