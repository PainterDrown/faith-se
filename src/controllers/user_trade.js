const UtrdModl = require('../models/user_trade');
const FundModl = require('../models/fund');
const { sendJson } = require('../utils/koa');
const { rename } = require('../utils');
const DateUtil = require('../utils/date');
const NumbUtil = require('../utils/number');

async function parse(ctx, next) {
  ctx.param.page = parseInt(ctx.param.page);
  ctx.param.per_page = parseInt(ctx.param.per_page);
  check('page', parseInt(ctx.param.page));
  check('per_page', parseInt(ctx.param.per_page));
  const [{ count: total }] = await Utrd.Modl.countByUserId(ctx.param.user_id);
  total += 1;  // 数据库COUNT的结果要加上1
  const { offset, length } = NumbUtil.parsePageAndPerPage(page, per_page, total);
  ctx.param.offset = offset;
  ctx.param.length = length;
  ctx.param.total = total;
  return next();
}

async function list(ctx, next) {
  const trades = await UtrdModl.findUserTradesByUserId(ctx.param.user_id);
  DateUtil.attributeToDateString('time', trades);
  for (const trade of trades) {
    trade.ship_date = trade.time.slice(0, 9);
    trade.ship_time = trade.time.slice(11, 18);
  }
  rename(
    ['name', 'code', 'bankcard_no', 'turnover'],
    ['fund_name', 'fundcode', 'ship_bankcard_no', 'ship_turnover'],
    trades
  );
  sendJson(ctx, { trade_log: trades });
}

async function fees(ctx, next) {
  const fees = require('../consts/fees');
  sendJson(ctx, { fee: fees });
  return next();
}

async function buy(ctx, next) {
  
}

exports = module.exports = {
  parse,
  list,
  fees,
  buy,
};
