const UserModl = require('../models/user');
const FundModl = require('../models/fund');
const FnvlModl = require('../models/fund_netvalue');
const FassModl = require('../models/fund_asset');
const FidsModl = require('../models/fund_industry');
const FincModl = require('../models/finance');
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
    ['save_fee', 'first_scale', 'lastest_value', 'lastest_scala'],
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
  DateUtil.attributeToDateString('date', fund_netvalues);
  rename(['percentage'], ['value'], fund_assets);
  rename(['percentage'], ['value'], fund_industries);
  const profit_rates = [];
  const raise_percentages = [];
  for (const fn of fund_netvalues) {
    const profit_rate = FincModl.calculate('profit_rate', fn.fn_id);
    const raise_percentage = FincModl.calculate('raise_percentage', fn.fn_id);
    profit_rates.push(profit_rate);
    raise_percentages.push(raise_percentage);
  }
  sendJson(ctx, {
    name: fund.name,
    netvalues: extract('netvalue', fund_netvalues),
    dates: extract('date', fund_netvalues),
    profit_rates: profit_rates,
    raise_percentages: raise_percentages,
    asset_allocation: fund_assets,
    industry_allocation: fund_industries,
  });
}

async function get(ctx, next) {
  if (!ctx.param.fund_id) {
    return next();
  }
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

async function index(ctx, next) {
  if (ctx.param.info_type === 'recommendations') {
    await recommend(ctx);
  }
  else if (ctx.param.info_type === 'soon') {
    await soon(ctx);
  }
  else if (ctx.param.info_type === 'fees') {
    await fees(ctx);
  }
  else if (ctx.param.info_type === 'fee') {
    await fee(ctx);
  }
  else if (ctx.param.page && ctx.param.per_page) {
    await parse(ctx);
    await list(ctx);
  }
  return next();
}

async function parse(ctx, next) {
  ctx.param.page = parseInt(ctx.param.page);
  ctx.param.per_page = parseInt(ctx.param.per_page);
  let [{ count: total }] = await FundModl.count();
  const { offset, length } = NumbUtil.parsePageAndPerPage(ctx.param.page, ctx.param.per_page, total);
  ctx.param.offset = offset;
  ctx.param.length = length;
  ctx.param.total = total;
}

async function list(ctx, next) {
  const funds = await FundModl.findFundsByRange(ctx.param.offset, ctx.param.length);
  DateUtil.attributeToDateString('found_date', funds);
  DateUtil.attributeToDateString('latest_netvalue_date', funds);
  rename(['found_date'], ['date'], funds);
  for (const fund of funds) {
    fund.year_profit_rate = FincModl.calculate('year_profit_rate', fund.fund_id);
    fund.total_profit_rate = FincModl.calculate('total_profit_rate', fund.fund_id);
  }
  sendJson(ctx, { funds, log_num: ctx.param.total });
}

async function recommend(ctx) {
  const recommend_funds =  require('../consts/recommend_funds');
  sendJson(ctx, { funds: recommend_funds });
}

async function soon(ctx) {
  const soon_funds =  require('../consts/soon_funds');
  sendJson(ctx, { funds: soon_funds });
}

async function fees(ctx) {
  const fees = require('../consts/fees');
  sendJson(ctx, { fee: fees });
}

async function fee(ctx) {
  let fee = 0.00;
  ctx.param.cost = parseFloat(ctx.param.cost);
  if (ctx.param.cost < 1000000) {
    fee = 0.006 * ctx.param.cost;
  }
  else if (ctx.param.cost < 5000000) {
    fee = 0.004 * ctx.param.cost;
  }
  else {
    fee = 1000;
  }
  sendJson(ctx, { fee });
}

exports = module.exports = {
  get,
  index,
  fees,
  fee,
};
