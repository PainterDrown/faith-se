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
    sendJson(ctx, {
      code: err.code,
      msg:  err.code === 0 ? '服务器内部错误' : err.msg,
    });
  }
}

exports = module.exports = handleError;
