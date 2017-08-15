/**
 * @description 
 * @param  {Function} func 普通函数
 * @return {Function}      可以用作koa中间件的函数
 * @author 郑钊
 */
function toMiddleware(func) {
  if (typeof func !== 'function') {
    throw new Error('func is not a function');
  }
  return async (ctx, next) => {
    await func(ctx.paramData);
    return next();
  };
}

exports = module.exports = toMiddleware;
