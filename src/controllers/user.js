const { queryDb } = require('../services/db');
const check       = require('../services/validation/check');
const FaithError  = require('../utils/FaithError');
const UserModel   = require('../models/user');
const sendJson    = require('../utils/sendJson');

async function checkIfUserExistByUsername(param_data) {
  const user = await UserModel.findUsersByUsernames([param_data.username]);
  if (user.length < 1)
    throw new FaithError(3, '用户不存在');
  param_data.user = user[0];
}

async function checkIfUserNotExistByUsername(param_data) {
  const user = await UserModel.findUsersByUsernames([param_data.username]);
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
  await UserModel.insertUser(ctx.param_data);
  const user = await UserModel.findUsersByUsernames([ctx.param_data.username]);
  sendJson(ctx, { user_id: user[0].user_id });
  return next();
}

async function getUserDetail(ctx, next) {
  const [user] = await UserModel.findUsersByIds([ctx.param_data.user_id]);
  const funds = await FundModel.findFundsByUserIds([ctx.param_data.user_id]);
  const ret = {};
  ret.total_asset = user.total_asset;
  ret.total_fund_cost = user.total_asset - user.savings - user.total_profit;
  ret.owned_funds = [];
  for (let fund of funds) {
    ret.owned_funds.push(fund.fund_id);
  }
  sendJson(ctx, ret);
}

exports = module.exports = {
  checkIfUserExistByUsername,
  checkIfUserNotExistByUsername,
  checkIfPasswordCorrect,
  loginSuccessfully,
  enrollSuccessfully,
  getUserDetail,
}
