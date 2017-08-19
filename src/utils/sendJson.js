function sendJson(ctx, obj) {
  ctx.body = Object.assign({}, obj);
  if (!obj.code) {
    ctx.body.code = 1;
    ctx.body.msg = 'ok';
  }
}

exports = module.exports = sendJson;
