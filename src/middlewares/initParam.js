async function initParam(ctx, next) {
  ctx.param_data = ctx.request.body;
  return next();
}

exports = module.exports = initParam;
