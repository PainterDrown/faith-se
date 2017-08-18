async function initParam(ctx, next) {
  ctx.set("Access-Control-Allow-Origin", ctx.request.header.origin);
  ctx.param_data = ctx.request.body;
  return next();
}

exports = module.exports = initParam;
