const UtrdModl = require('../models/user_trade');
const FundModl = require('../models/fund');
const UbcrModl = require('../models/user_bankcard');
const UserModl = require('../models/user');
const { sendJson } = require('../utils/koa');
const { rename, pick } = require('../utils');
const DateUtil = require('../utils/date');
const NumbUtil = require('../utils/number');
const FaithError = require('../utils/FaithError');

async function parse(ctx, next) {
  ctx.param.page = parseInt(ctx.param.page);
  ctx.param.per_page = parseInt(ctx.param.per_page);
  const [{ count: total }] = await UtrdModl.countByUserId(ctx.param.user_id);
  const { offset, length } = NumbUtil.parsePageAndPerPage(ctx.param.page, ctx.param.per_page, total);
  ctx.param.offset = offset;
  ctx.param.length = length;
  ctx.param.total = total;
  return next();
}

async function list(ctx, next) {
  const trades = await UtrdModl.findUserTradesByUserId(ctx.param.user_id);
  DateUtil.attributeToTimeString('time', trades);
  for (const trade of trades) {
    trade.ship_date = trade.time.slice(0, 9);
    trade.ship_time = trade.time.slice(11, 18);
  }
  rename(
    ['name',      'code',     'bankcard_no',      'turnover'],
    ['fund_name', 'fundcode', 'ship_bankcard_no', 'ship_turnover'],
    trades
  );
  sendJson(ctx, {
    trade_log: trades,
    log_num: ctx.param.total,
  });
}

async function payWithSavings(user_id, cost) {
  const [user] = await UserModl.findUsersByIds([user_id]);
  if (user.savings < cost) {
    throw new FaithError(2, '储蓄罐余额不足');
  }
  user.savings -= cost;
  pick(['savings'], [user]);
  await UserModl.updateUser(user_id, user);
}

async function buy(ctx, next) {
  const trade = {
    user_id: ctx.param.user_id,
    fund_id: ctx.param.fund_id,
    time: DateUtil.toTimeString(new Date()),
    turnover: ctx.param.expense,
  };
  // 储蓄罐支付
  if (ctx.param.pay_mode === 1) {
    await payWithSavings(ctx.param.user_id, ctx.param.expense);
  }
  // 银行卡支付
  else if (ctx.param.pay_mode === 2) {
    trade.bankcard_no = ctx.param.bankcard_no;
  }
  // 获取最新基金净值
  const [{ latest_netvalue }] = await FundModl.findFundsByIds([ctx.param.fund_id]);
  trade.amount = ctx.param.expense / latest_netvalue;
  trade.vamount = parseInt(trade.amount * 0.95);
  await UtrdModl.insertTrade(trade);
  sendJson(ctx, {});
  return next();
}

exports = module.exports = {
  parse,
  list,
  buy,
};
