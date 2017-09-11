const fm = require('../models/fund');
const fnm = require('../models/fund_netvalue');
const fam = require('../models/fund_asset');
const fim = require('../models/fund_industry');
const finm = require('../models/finance');
const sendJson  = require('../utils/sendJson');
const concurrent = require('../utils/concurrent');
const { extract, pick, rename } = require('../utils');

async function list(ctx, next) {
  const fund_totalnum = await fm.countAllFunds();
  const offset = ctx.param.page - 1;
  const length = ctx.param.per_page;
  if (offset + length > fund_totalnum) {
    length = fund_totalnum - offset;
  }
  const funds = await fm.findFundsByFundIdRange(offset, length);
  const fund_ids = extract('fund_id', funds);
  const fund_netvalues = await fnm.findFundNetvaluesByFundIds(fund_ids);
  for (const fund of fund) {
    for (let fn of fund_netvalues) {
      if (fund.fund_id === fn.fund_id) {
        if (!fund.latest_netvalue || fund.latest_netvalue_date < fn.date) {
          fund.latest_netvalue = fn.netvalue;
          fund.latest_netvalue_date = fn.date;
        }
      }
    }
    fund.year_profit_rate = finm.calculate('year_profit_rate');
    fund.total_profit_rate = finm.calculate('total_profit_rate');
  }
  sendJson(ctx, { funds, page_num });
}

async function detail(ctx, next) {
  const [[fund], fund_netvalues, fund_assets, fund_industries] = await concurrent(
    fm.findFundsByIds([ctx.param.fund_id]),
    fnm.findLatest4FundNetvaluesByFundId(ctx.param.fund_id),
    fam.findFundAssetsByFundId(ctx.param.fund_id),
    fim.findFundIndustriesByFundId(ctx.param.fund_id)
  );
  rename(['percentage'], ['value'], fund_assets);
  rename(['percentage'], ['value'], fund_industries);
  pick(['name', 'value'], fund_assets);
  pick(['name', 'value'], fund_industries);
  sendJson(ctx, {
    name: fund.name,
    netvalues: extract('netvalue', fund_netvalues),
    raise_percentages:  extract('raise_percentage', fund_netvalues),
    profit_rates: extract('profit_rate', fund_netvalues),
    asset_allocation: fund_assets,
    industry_allocation: fund_industries,
  });
}

exports = module.exports = {
  list,
  detail,
};
