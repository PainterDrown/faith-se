function accessControl(ctx) {
  ctx.set("Access-Control-Allow-Origin", ctx.request.header.origin);
}

function initParam(ctx) {
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
}

async function preprocess(ctx, next) {
  accessControl(ctx);
  initParam(ctx);
  return next();
}

exports = module.exports = preprocess;
