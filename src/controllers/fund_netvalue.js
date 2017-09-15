const FnvlModl = require('../models/fund_netvalue');
const NumbUtil = require('../utils/number');
const DateUtil = require('../utils/date');
const { sendJson } = require('../utils/koa');

async function parse(ctx, next) {
  ctx.param.fund_id = parseInt(ctx.param.fund_id);
  ctx.param.page = parseInt(ctx.param.page);
  ctx.param.per_page = parseInt(ctx.param.per_page);
  const [{ count: total }] = await FnvlModl.countByFundId(ctx.param.fund_id);
  const { offset, length } = NumbUtil.parsePageAndPerPage(ctx.param.page, ctx.param.per_page, total);
  ctx.param.offset = offset;
  ctx.param.length = length;
  ctx.param.total = total;
  return next();
}

async function list(ctx, next) {
  const fund_netvalues = await FnvlModl.findFundNetvaluesByRange(ctx.param.fund_id, ctx.param.offset, ctx.param.length);
  DateUtil.attributeToDateString('date', fund_netvalues);
  sendJson(ctx, {
    netvalues_log: fund_netvalues,
    log_num: ctx.param.total,
  });
  return next();
}

exports = module.exports = {
  parse,
  list,
}
