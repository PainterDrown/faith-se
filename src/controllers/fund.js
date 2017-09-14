const UserModl = require('../models/user');
const FundModl = require('../models/fund');
const FnvlModl = require('../models/fund_netvalue');
const FassModl = require('../models/fund_asset');
const FidsModl = require('../models/fund_industry');
const DateUtil = require('../utils/date');
const NumbUtil = require('../utils/number');
const FaithError = require('../utils/FaithError');
const concurrent = require('../utils/concurrent');
const { sendJson }  = require('../utils/koa');
const { extract, pick, rename } = require('../utils');

async function getBasicInfo(ctx) {
  const [fund] = await FundModl.findFundsByIds([ctx.param.fund_id]);
  rename(
    ['trs_fee', 'init_scale', 'latest_share', 'latest_scale'],
    ['save_fee', 'first_scale', 'last_value', 'lastest_scala'],
    [fund]
  );
  sendJson(ctx, { fund });
}

async function getFinancialInfo(ctx) {
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
  rename(['percentage'], ['value'], fund_assets);
  rename(['percentage'], ['value'], fund_industries);
  sendJson(ctx, {
    name: fund.name,
    netvalues: extract('netvalue', fund_netvalues),
    dates: extract('date', fund_netvalues),
    profit_rates: extract('profit_rate', fund_netvalues),
    asset_allocation: fund_assets,
    industry_allocation: fund_industries,
  });
}

async function get(ctx, next) {
  if (!ctx.param.info_type) {
    throw new FaithError(2, `缺乏参数info_type`);
  }
  switch (ctx.param.info_type) {
    case 'basic':
      await getBasicInfo(ctx);
      break;
    case 'financial':
      await getFinancialInfo(ctx);
      break;
    default:
      throw new FaithError(2, `参数info_type错误`);
  }
  return next();
}

async function parse(ctx, next) {
  ctx.param.page = parseInt(ctx.param.page);
  ctx.param.per_page = parseInt(ctx.param.per_page);
  const [{ count: total }] = await FnvlModl.count();
  total += 1;  // 数据库COUNT的结果要加上1
  const { offset, length } = NumbUtil.parsePageAndPerPage(page, per_page, total);
  ctx.param.offset = offset;
  ctx.param.length = length;
  ctx.param.total = total;
  return next();
}

async function list(ctx, next) {
  const funds = await FundModl.findFundsByRange(ctx.param.offset, ctx.param.length);
  DateUtil.attributeToDateString('found_date', funds);
  DateUtil.attributeToDateString('latest_netvalue_date', funds);
  rename(['found_date'], ['date'], funds);
  for (const fund of funds) {
    fund.year_profit_rate = FincModl.calculate('year_profit_rate');
    fund.total_profit_rate = FincModl.calculate('total_profit_rate');
  }
  sendJson(ctx, { funds, log_num: ctx.param.total });
  return next();
}

async function recommend(ctx, next) {
  const recommend_funds =  require('../consts/recommend_funds');
  sendJson(ctx, { funds: recommend_funds });
  return next();
}

async function soon(ctx, next) {
  const soon_funds =  require('../consts/soon_funds');
  sendJson(ctx, { funds: soon_funds });
  return next();
}

exports = module.exports = {
  get,
  parse,
  list,
  recommend,
  soon,
};
