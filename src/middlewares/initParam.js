async function initParam(ctx, next) {
  ctx.param = {};
  if (ctx.request.body) {
    Object.assign(ctx.param, ctx.request.body);
  }
  if (ctx.params) {
    Object.assign(ctx.param, ctx.params);
  }
  if (ctx.request.query) {
    Object.assign(ctx.param, ctx.request.query);
  }
  return next();
}

exports = module.exports = initParam;
