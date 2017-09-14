const FnvlModl = require('../models/fund_netvalue');
const NumbUtil = require('../utils/number');
const DateUtil = require('../utils/date');
const { sendJson } = require('../utils/koa');

async function parse(ctx, next) {
  ctx.param.page = parseInt(ctx.param.page);
  ctx.param.per_page = parseInt(ctx.param.per_page);
  const [{ count: total }] = await FnvlModl.countByFundId(ctx.param.fund_id);
  total += 1;  // 数据库COUNT的结果要加上1
  const { offset, length } = NumbUtil.parsePageAndPerPage(page, per_page, total);
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
