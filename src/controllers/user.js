const UserModl = require('../models/user');
const FbuyModl = require('../models/fund_buy');
const FnvlModl = require('../models/fund_netvalue');
const FcltModl = require('../models/fund_collection');
const { queryDb } = require('../services/db');
const FaithError = require('../utils/FaithError');
const sendJson = require('../utils/sendJson');
const concurrent = require('../utils/concurrent');
const { sum, extract, filter, pick } = require('../utils');
const validation = require('../services/validation');
const chinese = require('../consts/chinese');

function checkIfUnique(keys) {
  return async (param) => {
    const obj = {};
    for (let key of keys) {
      obj[key] = param[key];
    }
    const [user] = await UserModl.findUserByObject(obj);
    if (user) {
      for (let key of keys) {
        if (param[key] === user[key]) {
          throw new FaithError(4, `${chinese[key]}已被使用`);
        }
      }
    }
  };
}

function checkIfExist(keys) {
  return async (param) => {
    const obj = {};
    for (let key of keys) {
      obj[key] = param[key];
    }
    const [user] = await UserModl.findUserByObject(obj);
    if (!user) {
      throw new FaithError(6);
    }
    param.user = user;
  };
}

function checkIfMatch(keys) {
  return async (param) => {
    for (let key of keys) {
      if (param[key] !== param.user[key]) {
        throw new FaithError(5, `${chinese[key]}错误`);
      }
    }
  };
}

function login(ctx, next) {
  sendJson(ctx, { user_id: ctx.param.user.user_id });
  return next();
}

async function enroll(ctx, next) {
  await UserModl.insertUser(ctx.param);
  const [user] = await UserModl.findUsersByUsernames([ctx.param.username]);
  sendJson(ctx, { user_id: user.user_id });
  return next();
}

async function getPersonalInfo(ctx) {
  const [user] = await UserModl.findUsersByIds([ctx.param.user_id]);
  filter(['password', 'tcode'], [user]);
  sendJson(ctx, { user });
}

async function getBoughtFunds(ctx) {
  const bought_funds = await FbuyModl.findFundBuysByUserId(ctx.param.user_id);
  sendJson(ctx, { bought_funds });
}

async function getAssetInfo(ctx) {
  const [[user], fund_buys, funds_netvalue_sum] = await concurrent(
    UserModl.findUsersByIds([ctx.param.user_id]),
    FbuyModl.findFundBuysByUserId(ctx.param.user_id),
    FnvlModl.findUserFundsNetvalueSumByUserId(ctx.param.user_id)
  );
  if (!user) {
    throw new FaithError(6);
  }
  pick(['is_auth', 'savings']);
  user.funds_netvalue_sum = funds_netvalue_sum;
  user.total_asset = ufn_sum + user.savings;
  user.total_profit = ufn_sum - sum(extract(fund_buys, 'cost'));
  sendJson(ctx, { user });
}

async function index(ctx, next) {
  switch (ctx.param.info_type) {
    case 'personal':
      await getPersonalInfo(ctx);
      break;
    case 'asset':
      await getAssetInfo(ctx);
      break;
    case 'bought_fund':
      await getBoughtFunds(ctx);
      break;
    case 'collected_funds':
      await getCollectedFunds(ctx);
      break;
    default:
      throw new FaithError(2, `缺乏参数：info_type`);
  }
  return next();
  const [[user], , [{sum: ufn_sum}], collections] = await concurrent(

    FnvlModl.findUserFundsNetvalueSumByUserId(ctx.param.user_id),
    FcltModl.findFundCollectionsByUserId(ctx.param.user_id)
  );

  user.collections = collections;
  

  user.owned_funds = extract('fund_id', fund_buys);
  sendJson(ctx, user);
}

async function certificate(ctx, next) {
  const user_id = ctx.param.user_id;
  const keys = ['id', 'realname', 'bank_name', 'bank_area', 'bank_phone', 'bank_cardno', 'tcode'];
  const obj = {};
  for (const key of keys) {
    obj[key] = ctx.param[key];
  }
  obj.is_auth = 1;
  await checkIfMatch.updateUser(user_id, obj);
  sendJson(ctx, {});
}

exports = module.exports = {
  checkIfUnique,
  checkIfExist,
  checkIfMatch,
  login,
  enroll,
  detail,
  certificate,
}
