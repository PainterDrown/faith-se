const um = require('../models/user');
const fbm = require('../models/fund_buy');
const fnm = require('../models/fund_netvalue');
const { queryDb } = require('../services/db');
const FaithError = require('../utils/FaithError');
const sendJson = require('../utils/sendJson');
const concurrent = require('../utils/concurrent');
const { sum, extract, filter } = require('../utils');
const validation = require('../services/validation');
const chinese = require('../consts/chinese');

function checkIfUnique(fieldnames) {
  return async (param) => {
    const info = {};
    for (let fieldname of fieldnames) {
      info[fieldname] = param[fieldname];
    }
    const [user] = await um.findUserByInfo(info);
    if (user) {
      for (let fieldname of fieldnames) {
        if (param[fieldname] === user[fieldname]) {
          throw new FaithError(4, `${chinese[fieldname]}已被使用`);
        }
      }
    }
  };
}

function checkIfExist(fieldnames) {
  return async (param) => {
    const info = {};
    for (let fieldname of fieldnames) {
      info[fieldname] = param[fieldname];
    }
    const [user] = await um.findUserByInfo(info);
    if (!user) {
      throw new FaithError(6);
    }
    param.user = user;
  };
}

function checkIfCorrect(fieldnames) {
  return async (param) => {
    for (let fieldname of fieldnames) {
      if (param[fieldname] !== param.user[fieldname]) {
        throw new FaithError(5, `${chinese[fieldname]}错误`);
      }
    }
  };
}

function login(ctx, next) {
  sendJson(ctx, { user_id: ctx.param.user.user_id });
  return next();
}

async function enroll(ctx, next) {
  await um.insertUser(ctx.param);
  const [user] = await um.findUsersByUsernames([ctx.param.username]);
  sendJson(ctx, { user_id: user.user_id });
  return next();
}

async function detail(ctx, next) {
  const [[user], fund_buys, [{sum: ufn_sum}]] = await concurrent(
    um.findUsersByIds([ctx.param.user_id]),
    fbm.findFundBuysByUserId(ctx.param.user_id),
    fnm.findUserFundsNetvalueSumByUserId(ctx.param.user_id)
  );
  if (!user) {
    throw new FaithError(6);
  }
  filter(['password', 'tcode'], [user]);
  user.total_asset = ufn_sum + user.savings;
  user.total_profit = ufn_sum - sum(extract(fund_buys, 'cost'));
  user.owned_funds = extract('fund_id', fund_buys);
  sendJson(ctx, user);
}

async function certificate(ctx, next) {
  const user_id = ctx.param.user_id;
  const fieldnames = ['id', 'realname', 'bank_name', 'bank_area', 'bank_phone', 'bank_cardno', 'tcode'];
  const info = {};
  for (const fieldname of fieldnames) {
    info[fieldname] = ctx.param[fieldname];
  }
  info.is_auth = 1;
  await um.updateUser(user_id, info);
  sendJson(ctx, {});
}

exports = module.exports = {
  checkIfUnique,
  checkIfExist,
  checkIfCorrect,
  login,
  enroll,
  detail,
  certificate,
}
