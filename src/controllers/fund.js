const FundModl = require('../models/fund');
const FnvlModl = require('../models/fund_netvalue');
const FassModl = require('../models/fund_asset');
const FidsModl = require('../models/fund_industry');
const FincModl = require('../models/finance');
const DateUtil = require('../utils/date');
const NumbUtil = require('../utils/number');
const FaithError = require('../utils/FaithError');
const sendJson  = require('../utils/sendJson');
const concurrent = require('../utils/concurrent');
const { extract, pick, rename } = require('../utils');

async function get(ctx, next) {
  const [[fund], fund_netvalues, fund_assets, fund_industries] = await concurrent(
    FundModl.findFundsByIds([ctx.param.fund_id]),
    FnvlModl.findLatestFundNetvaluesByFundId(ctx.param.fund_id),
    FassModl.findFundAssetsByFundId(ctx.param.fund_id),
    FidsModl.findFundIndustriesByFundId(ctx.param.fund_id)
  );
  pick(['name', 'percentage'], fund_assets);
  pick(['name', 'percentage'], fund_industries);
  NumbUtil.divideSomeAttribute('percentage', 10000, fund_assets);
  NumbUtil.divideSomeAttribute('percentage', 10000, fund_industries);
  sendJson(ctx, {
    name: fund.name,
    netvalues: extract('netvalue', fund_netvalues).slice(0, 4),
    dates: DateUtil.toDateString(extract('date', fund_netvalues).slice(0, 4)),
    raise_percentages: FincModl.calculate('raise_percentages'),
    profit_rates: FincModl.calculate('profit_rates'),
    asset_allocation: fund_assets,
    industry_allocation: fund_industries,
  });
}

async function parse(ctx, next) {
  ctx.param.page = parseInt(ctx.param.page);
  ctx.param.per_page = parseInt(ctx.param.per_page);
  // 确保参数为正数
  if (ctx.param.page <= 0 || ctx.param.per_page <= 0) {
    throw new FaithError(5);
  }
  let [{ count: total }] = await FundModl.countAllFunds();
  total += 1;  // 数据库COUNT的结果要加上1
  let length = ctx.param.per_page;
  // 检查参数是否超出范围
  const offset = (ctx.param.page - 1) * parseInt(ctx.param.per_page);
  if (offset >= total) {
    throw new FaithError(5);
  }
  if (offset + length > total) {
    length = total - offset;
  }
  ctx.total = total;
  ctx.param.offset = offset;
  ctx.param.length = length;
  return next();
}

async function list(ctx, next) {
  const funds = await FundModl.findFundsByFundIdRange(ctx.param.offset, ctx.param.length);
  DateUtil.attributeToDateString('found_date', funds);
  DateUtil.attributeToDateString('latest_netvalue_date', funds);
  for (const fund of funds) {
    fund.year_profit_rate = FincModl.calculate('year_profit_rate');
    fund.total_profit_rate = FincModl.calculate('total_profit_rate');
  }
  sendJson(ctx, { funds, total: ctx.param.total });
}

async function recommend(ctx, next) {
  ctx.param.num = parseInt(ctx.param.num);
  if (ctx.param.num <= 0) {
    throw new FaithError(5, '参数必须为正数');
  }
  const funds = await FundModl.recommend(ctx.param.num);
  for (const fund of funds) {
    fund.forecast_profit_rate = FincModl.calculate('forecast_profit_rate');
    fund.reason = 'i do not know why';  // modify
    fund.star = 4.0 + Math.random();
  }
  sendJson(ctx, { funds });
}

exports = module.exports = {
  get,
  parse,
  list,
  recommend,
};
