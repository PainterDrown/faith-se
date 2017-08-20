const user_model          = require('../models/user');
const fund_buy_model      = require('../models/fund_buy');
const fund_netvalue_model = require('../models/fund_netvalue');
const { queryDb }         = require('../services/db');
const check               = require('../services/validation/check');
const FaithError          = require('../utils/FaithError');
const sendJson            = require('../utils/sendJson');
const concurrent          = require('../utils/concurrent');
const { filter, extract, sum } = require('../utils');

async function checkIfUserExistByUsername(param_data) {
  const user = await user_model.findUsersByUsernames([param_data.username]);
  if (user.length < 1)
    throw new FaithError(3, '用户不存在');
  param_data.user = user[0];
}

async function checkIfUnique(param_data, fieldnames) {
  
}

async function checkIfUserNotExistByUsername(param_data) {
  const user = await user_model.findUsersByUsernames([param_data.username]);
  if (user.length > 0)
    throw new FaithError(4, '用户名已存在');
}

function checkIfPasswordCorrect(param_data) {
  if (param_data.password !== param_data.user.password)
    throw new FaithError(5, '密码错误');
}

function loginSuccessfully(ctx, next) {
  sendJson(ctx, { user_id: ctx.param_data.user.user_id });
  return next();
}

async function enrollSuccessfully(ctx, next) {
  await user_model.insertUser(ctx.param_data);
  const user = await user_model.findUsersByUsernames([ctx.param_data.username]);
  sendJson(ctx, { user_id: user[0].user_id });
  return next();
}

async function getUserDetail(ctx, next) {
  const [[user], funds, funds_netvalue_sum] = await concurrent(
    user_model.findUsersByIds([ctx.param_data.user_id]),
    fund_buy_model.findFundsByUserId(ctx.param_data.user_id),
    fund_netvalue_model.getUserFundsNetvalueSumByUserId(ctx.param_data.user_id)
  );
  filter([user], ['password', 'tcode']);
  user.total_asset  = funds_netvalue_sum + user.savings;
  user.total_profit = funds_netvalue_sum - sum(extract(funds, 'cost'));
  user.owned_funds  = extract(funds, 'fund_id');
  sendJson(ctx, user);
}

exports = module.exports = {
  checkIfUserExistByUsername,
  checkIfUserNotExistByUsername,
  checkIfPasswordCorrect,
  loginSuccessfully,
  enrollSuccessfully,
  getUserDetail,
}
