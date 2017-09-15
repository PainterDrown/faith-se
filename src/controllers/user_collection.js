const concurrent = require('../utils/concurrent');
const FundModl = require('../models/fund');
const FcltModl = require('../models/user_collection');
const FaithError = require('../utils/FaithError');
const { sendJson }  = require('../utils/koa');

async function post(ctx, next) {
  ctx.param.user_id = parseInt(ctx.param.user_id);
  const [collection] = await FcltModl.findByUserIdAndFundId(ctx.param.user_id, ctx.param.fund_id);
  if (collection) {
    throw new FaithError(2, '已经收藏过该基金');
  }
  await FcltModl.insert(ctx.param.user_id, ctx.param.fund_id);
  sendJson(ctx, {});
  return next();
}

exports = module.exports = {
  post,
};
