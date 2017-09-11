function sendJson(ctx, obj, code, msg) {
  ctx.body = Object.assign({}, obj);
  ctx.body.code = code ? code : 1;
  ctx.body.msg  = msg  ? msg  : 'ok';
}

exports = module.exports = sendJson;
