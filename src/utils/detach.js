const FaithError = require('./FaithError');

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