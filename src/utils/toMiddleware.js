const FaithError = require('../utils/FaithError');

/**
 * @description 
 * @param  {function} func 普通函数
 * @return {function}      可以用作koa中间件的函数
 * @author 郑钊
 */
function toMiddleware(func) {
  if (typeof func !== 'function') 
    throw new FaithError(0, '传入的参数类型不是function');
  return async (ctx, next) => {
    await func(ctx.param);
    return next();
  };
}

exports = module.exports = toMiddleware;
