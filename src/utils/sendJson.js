function sendJson(ctx, obj) {
  ctx.body = Object.assign({}, obj);
  if (!obj.code)
    ctx.body.code = 1;
}

exports = module.exports = sendJson;
