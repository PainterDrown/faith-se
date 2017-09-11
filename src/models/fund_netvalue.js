const { queryDb } = require('../services/db');

function findUserFundsNetvalueSumByUserId(user_id) {
  const sql = `
  SELECT
    SUM(fn.netvalue) AS sum
  FROM
    fund_netvalue AS fn,
    fund_buy AS fb
  WHERE
    fb.user_id = ? AND
    fb.fund_id = fn.fund_id
  ;`;
  const values = [user_id];
  return queryDb(sql, values);
}

function findLatestFundNetvaluesByFundId(fund_id) {
  const sql = `
  SELECT
    fn.*
  FROM
    fund_netvalue AS fn
  WHERE
    fn.fund_id = ?
  ORDER BY fn.date DESC
  ;`;
  const values = [fund_id];
  return queryDb(sql, values);
}

function findFundNetvaluesByFundIds(fund_ids) {
  const sql = `
  SELECT
    fn.*
  FROM
    fund_netvalue AS fn
  WHERE
    fn.fund_id IN (?)
  ;`;
  const values = [fund_ids];
  return queryDb(sql ,values);
}

exports = module.exports = {
  findUserFundsNetvalueSumByUserId,
  findLatestFundNetvaluesByFundId,
  findFundNetvaluesByFundIds,
};
