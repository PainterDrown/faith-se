/**
 * @description 计算基金份额净值
 * @param  {Number} netvalue 基金净值
 * @param  {Number} units    基金份额
 * @return {Number}          基金份额净值
 */
function calculateNAV(netvalue, units) {
  return netvalue / units;
}

/**
 * @description 计算期末基金净值
 * @param  {Number} beginning_netvalue      期初基金资产净值
 * @param  {Number} business_netvalue_delta 本期经营活动产生的基金净值变动数
 * @param  {Number} trade_netvalue_delta    本期基金份额交易产生的基金净值变动数
 * @param  {Number} profit_netvalue_delta   本期向基金份额持有人分配利润产生的基金净值变动数
 * @return {Number}                         期末基金净值   
 */
function calculateEndingNetvalue(
  beginning_netvalue,
  business_netvalue_delta,
  trade_netvalue_delta,
  profit_netvalue_delta) {
  return beginning_netvalue      +
         business_netvalue_delta +
         trade_netvalue_delta    +
         profit_netvalue_delta;
}

/**
 * @description 计算基金份额交易产生的基金净值变动数
 * @param  {Number} subscription 基金申购款
 * @param  {Number} redemption   基金赎回款
 * @return {Number}              基金份额交易产生的基金净值变动数
 */
function calculateTradeNetvalueDelta(subscription, redemption) {
  return subscription - redemption;
}

/**
 * @description 计算基金申购款
 * @param  {Number} amount 基金申购份额
 * @param  {Number} rate   基金申购费率
 * @param  {Number} NAV    基金份额净值
 * @return {Number}        基金申购款
 */
function calculateSubscription(amount, rate, NAV) {
  return amount * (1 + rate) * NAV;
}

/**
 * @description 计算基金赎回款
 * @param  {Number} amount 基金申购份额
 * @param  {Number} rate   基金申购费率
 * @param  {Number} NAV    基金份额净值
 * @return {Number}        基金赎回款
 */
function calculateRedemption(amount, rate, NAV) {
  return amount * (1 - rate) * NAV;
}

/**
 * @description 计算基金份额持有人分配利润产生的基金净值变动数
 * @return {Number} 基金份额持有人分配利润产生的基金净值变动数
 */
function calculateProfitNetvalueDelta() {
  return 0;
}

/**
 * @description 计算基金经营活动产生的基金净值变动数
 * @param  {Number} fairvalue_delta   本期基金经营活动产生的基金净值变动数
 * @param  {Number} investment_income 基金本期经营活动产生的基金净值变动数
 * @return {Number}                   基金经营活动产生的基金净值变动数
 */
function calculateBusinessNetvalueDelta(fairvalue_delta, investment_income) {
  return fairvalue_delta + investment_income;
}

/**
 * @description 计算公允价值变动损益变动值
 * @param  {Number} baseday_trade_asset   基准日交易性金融资产
 * @param  {Number} beginning_trade_asset 季度第一天的交易性金融资产
 * @return {Number}                       公允价值变动损益变动值
 */
function calculateFairvalueDelta(baseday_trade_asset, beginning_trade_asset) {
  return baseday_trade_asset - beginning_trade_asset;
}

/**
 * @description 计算股票投资收益
 * @param  {Number} stock_amount 股票份数
 * @return {Number}              股票投资收益
 */
function calculateStockInvestmentIncome(stock_amount) {
  return stock_amount / 10 * 2;
}

/**
 * @description 计算债券投资收益
 * @param  {Number} amount        债券份数
 * @param  {Number} facevalue     债券面值
 * @param  {Number} interest_rate 债券利率
 * @return {Number}               计算债券投资收益
 */
function calculateBondInvestmentIncome(amount, facevalue, interest_rate) {
  return amount * facevalue * interest_rate;
}

function calculateInvestmentIncome(stock_income, bond_income) {
  return stock_income + bond_income;
}

/**
 * @description 计算区间回报率
 * @param  {Number} Nb 期初单位资产净值
 * @param  {Number} Ne 期末单位资产净值
 * @return {Number}    区间回报率
 */
function calculateIntervalRewardRate(Nb, Ne) {
  return (Ne / Nb) - 1;
}

// test
function calculate() {
  return 0.22;
}

exports = module.exports = {
  calculate,
};
