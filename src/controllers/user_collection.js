const concurrent = require('../utils/concurrent');
const FundModl = require('../models/fund');
const FcltModl = require('../models/user_collection');

async function post(ctx, next) {
  await insertFundCollection(ctx.param.user_id, ctx.param.fund_id);
  return next();
}

exports = module.exports = {
  post,
};
