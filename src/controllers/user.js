const md5 = require('md5');
const UserModl = require('../models/user');
const FundModl = require('../models/fund');
const UtrdModl = require('../models/user_trade');
const UcltModl = require('../models/user_collection');
const FnvlModl = require('../models/fund_netvalue');
const UbcrModl = require('../models/user_bankcard');
const { queryDB } = require('../services/db');
const FaithError = require('../utils/FaithError');
const { sendJson } = require('../utils/koa');
const concurrent = require('../utils/concurrent');
const DateUtil = require('../utils/date');
const NumbUtil = require('../utils/number');
const { extract, filter, pick, rename } = require('../utils');

async function getPersonalInfo(ctx) {
  const [[user], bankcards] = await concurrent(
    UserModl.findUsersByIds([ctx.param.user_id]),
    UbcrModl.findBankcardsByUserId(ctx.param.user_id)
  );
  rename(
    ['bank_name', 'bank_phone', 'bank_area', 'number'],
    ['bankname', 'bankphone', 'bankarea', 'bankcard_no'],
    bankcards
  );
  user.owned_cards = bankcards;
  filter(['password', 'tcode'], [user]);
  sendJson(ctx, { user });
}

async function getBoughtFunds(ctx) {
  const bought_funds = await UtrdModl.findUserTradesByUserId(ctx.param.user_id, ctx.param.offset, ctx.param.length);
  pick(['fund_id', 'name', 'latest_netvalue', 'amount', 'vamount', 'bankcard_no', 'ut_state'], bought_funds);
  rename(
    ['name',      'latest_netvalue',    'amount',     'vamount',          'bankcard_no',      'ut_state'],
    ['fund_name', 'fund_last_netvalue', 'ship_share', 'ship_valid_share', 'ship_bankcard_no', 'ship_state'],
    bought_funds
  );
  sendJson(ctx, {
    owned_funds: bought_funds,
    log_num: ctx.param.total,
  });
}

async function getAssetInfo(ctx) {
  const [[user], user_trades, collected_funds] = await concurrent(
    UserModl.findUsersByIds([ctx.param.user_id]),
    UtrdModl.findUserTradesByUserId(ctx.param.user_id),
    UcltModl.findUserCollectionsByUserId(ctx.param.user_id)
  );
  let funds_netvalue = 0;
  const funds = await FundModl.findFundsByIds(extract('fund_id', user_trades));
  for (const ut of user_trades) {
    for (const fund of funds) {
      if (ut.fund_id === fund.fund_id) {
        funds_netvalue += ut.amount * fund.latest_netvalue
      }
    }
  }
  filter(['password', 'tcode'], [user]);
  DateUtil.attributeToDateString('savings_date', [user]);
  DateUtil.attributeToDateString('found_date', collected_funds);
  DateUtil.attributeToDateString('latest_netvalue_date', collected_funds);
  user.funds_netvalue = funds_netvalue;
  user.total_asset = funds_netvalue + user.savings;
  user.total_profit = funds_netvalue - NumbUtil.sum(extract('turnover', user_trades));
  user.favorite = collected_funds;
  rename(
    ['savings_date', 'savings_rate'],
    ['saving_date', 'saving_rate'],
    [user]
  );
  rename(
    ['found_date', 'latest_netvalue'],
    ['date', 'netvalue'],
    collected_funds
  );
  sendJson(ctx, { user });
}

async function parse(ctx) {
  ctx.param.user_id = parseInt(ctx.param.user_id);
  ctx.param.page = parseInt(ctx.param.page);
  ctx.param.per_page = parseInt(ctx.param.per_page);
  let [{ count: total }] = await UtrdModl.countByUserId(ctx.param.user_id);
  const { offset, length } = NumbUtil.parsePageAndPerPage(ctx.param.page, ctx.param.per_page, total);
  ctx.param.offset = offset;
  ctx.param.length = length;
  ctx.param.total = total;
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
      await parse(ctx);
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
  sendJson(ctx, {});
  return next();
}

async function signin(ctx, next) {
  const [user] = await UserModl.findUsersByUsernames([ctx.param.username]);
  if (!user) {
    throw new FaithError(2, 'username不存在');
  }
  if (md5(ctx.param.password) !== user.password) {
    throw new FaithError(2, 'password错误');
  }
  sendJson(ctx, { user_id: user.user_id });
  return next();
}

async function signup(ctx, next) {
  let [user] = await UserModl.findUsersByUsernames([ctx.param.username]);
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
    id: ctx.param.id,
    user_id:  ctx.param.user_id,
    realname: ctx.param.realname,
    tcode: md5(ctx.param.tcode),
  };
  const bankcard = {
    bank_name: ctx.param.bankname,
    bankcard_no: ctx.param.bankcard_no,
    bank_phone: ctx.param.bankphone,
    bank_area: ctx.param.bankarea,
  }
  await concurrent(
    UserModl.updateUser(ctx.param.user_id, user),
    UbcrModl.insertBankcard(ctx.param.user_id, bankcard)
  );
  sendJson(ctx, {});
  return next();
}

async function consult(ctx, next) {
  const consult = require('../consts/consult');
  sendJson(ctx, consult);
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
