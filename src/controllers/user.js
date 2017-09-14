const md5 = require('md5');
const UserModl = require('../models/user');
const FbuyModl = require('../models/fund_buy');
const FnvlModl = require('../models/fund_netvalue');
const FcltModl = require('../models/fund_collection');
const { queryDb } = require('../services/db');
const FaithError = require('../utils/FaithError');
const sendJson = require('../utils/sendJson');
const concurrent = require('../utils/concurrent');
const DateUtil = require('../utils/date');
const NumbUtil = require('../utils/number');
const { sum, extract, filter, pick, rename } = require('../utils');

async function getPersonalInfo(ctx) {
  const [user] = await UserModl.findUsersByIds([ctx.param.user_id]);
  filter(['password', 'tcode'], [user]);
  sendJson(ctx, { user });
  return next();
}

async function getBoughtFunds(ctx) {
  const bought_funds = await FbuyModl.findFundBuysByUserId(ctx.param.user_id);
  rename(
    ['name', 'latest_netvalue', 'share', 'valid_share', 'state'],
    ['fund_name', 'fund_latest_netvalue', 'ship_share', 'ship_valid_share', 'ship_state'],
    bought_funds
  );
  sendJson(ctx, { owned_funds: bought_funds });
  return next();
}

async function getAssetInfo(ctx) {
  const [[user], fund_buys, funds_netvalue_sum, collected_funds] = await concurrent(
    UserModl.findUsersByIds([ctx.param.user_id]),
    FbuyModl.findFundBuysByUserId(ctx.param.user_id),
    FnvlModl.findUserFundsNetvalueSumByUserId(ctx.param.user_id),
    FcltmModl.findFundCollectionByUserId(ctx.param.user_id)
  );
  pick(['is_auth', 'savings'], [user]);
  NumbUtil.divideSomeAttribute('savings_rate', 1000, [user]);
  DateUtil.attributeToDateString('savings_date', [user]);
  user.funds_netvalue = funds_netvalue_sum;
  user.total_asset = ufn_sum + user.savings;
  user.total_profit = ufn_sum - sum(extract(fund_buys, 'cost'));
  user.favorite = collected_funds;
  rename(
    ['savings_date', 'savings_rate'],
    ['saving_date', 'saving_rate'],
    [user]
  );
  sendJson(ctx, { user });
  return next();
}

async function get(ctx, next) {
  if (!ctx.param.info_type) {
    throw new FaithError(2, `缺乏参数info_type`);
  }
  switch (ctx.param.info_type) {
    case 'personal':
      await getPersonalInfo(ctx);
      break;
    case 'asset':
      await getAssetInfo(ctx);
      break;
    case 'bought_funds':
      await getBoughtFunds(ctx);
      break;
    default:
      throw new FaithError(2, `参数info_type错误`);
  }
  return next();
}

async function put(ctx, next) {
  const user = {
    phone: ctx.param.phone,
    email: ctx.param.email,
    address: ctx.param.address,
  };
  await UserModl.updateUser(parseInt(ctx.param.user_id), user);
  return next();
}

async function signin(ctx, next) {
  const [user] = await UserModl.findUsersByUsernames([username]);
  if (!user) {
    throw new FaithError(2, 'username不存在');
  }
  if (md5(ctx.param.password) !== user.password) {
    throw new FaithError(2, 'password错误');
  }
  sendJson(ctx, { user_id: ctx.param.user.user_id });
  return next();
}

async function signup(ctx, next) {
  let [user] = await UserModl.findUsersByUsernames([username]);
  if (user) {
    throw new FaithError(2, 'username已存在');
  }
  user = {
    username: ctx.param.username,
    password: md5(ctx.param.password),
  }
  await UserModl.insertUser(user);
  [user] = await UserModl.findUsersByUsernames([ctx.param.username]);
  sendJson(ctx, { user_id: user.user_id });
  return next();
}

async function certificate(ctx, next) {
  const user = {
    is_auth: 1,
    user_id:  ctx.param.user_id,
    realname: ctx.param.realname,
    bank_name: ctx.param.bankname,
    bank_cardno: ctx.param.bankcard_no,
    bank_phone: ctx.param.bankphone,
    bank_area: ctx.param.bankarea,
    tcode: ctx.param.tcode,
  };
  await UserModl.updateUser(ctx.param.user_id, user);
  sendJson(ctx, {});
  return next();
}

async function consult(ctx, next) {
  sendJson(ctx, {
    description: `感谢您参与本次问卷填写。
    根据投资者风险承受能力评估评分表的评价，您的风险承受能力为：稳健型。
    风险中性投资者，具有一定的风险承受能力，希望可以获得较为稳健的投资回报。`
  });
  return next();
}

exports = module.exports = {
  get,
  put,
  signin,
  signup,
  certificate,
  consult,
};
