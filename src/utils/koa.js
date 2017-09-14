const FaithError = require('../FaithError');

function detach(middleware) {
  return async (ctx, next) => {
    try {
      const ret = mid(ctx, () => {});
      if (ret.catch)
        // 这里捕获异步中间件的错误
        ret.catch((err) => {
          throw new FaithError(0, '异步中间件执行出错', err.stack);
        });
    } catch(err) {
      // 这里捕获同步中间件的错误
      throw new FaithError(0, '同步中间件执行出错', err.stack);
    }
    return next();
  };
}

function catchParam(key) {
  return async (value, ctx, next) => {
    ctx.param[key] = value;
    return next();
  }
}

function sendJson(ctx, obj, code, msg) {
  ctx.body = Object.assign({}, obj);
  ctx.body.code = code ? code : 1;
  ctx.body.msg  = msg  ? msg  : 'ok';
}

/**
 * @description 
 * @param  {function} func 普通函数
 * @return {function}      可以用作koa中间件的函数
 * @author 郑钊
 */
function toMiddleware(func) {
  if (typeof func !== 'function') {
    throw new FaithError(0, '参数func的类型不是function');
  }
  return async (ctx, next) => {
    await func(ctx.param);
    return next();
  };
}

exports = module.exports = {
  detach,
  catchParam,
  sendJson,
  toMiddleware,
};
