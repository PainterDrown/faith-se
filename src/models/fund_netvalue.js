const { queryDB } = require('../services/db');

function countByFundId(fund_id) {
  const sql = `
  SELECT
    COUNT(fn.fn_id) AS count
  FROM
    fund_netvalue AS fn
  WHERE
    fn.fund_id = ?
  ;`;
  const values = [fund_id];
  return queryDB(sql, values);
}

function findUserFundsNetvalueSumByUserId(user_id) {
  const sql = `
  SELECT
    SUM(fn.netvalue) AS sum
  FROM
    fund_netvalue AS fn,
    user_trade AS ut
  WHERE
    ut.user_id = ? AND
    ut.fund_id = fn.fund_id
  ;`;
  const values = [user_id];
  return queryDB(sql, values);
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
  return queryDB(sql, values);
}

function findFundNetvaluesByFundId(fund_id) {
  const sql = `
  SELECT
    fn.*
  FROM
    fund_netvalue AS fn
  WHERE
    fn.fund_id = ?
  ;`;
  const values = [fund_id];
  return queryDB(sql ,values);
}

function findFundNetvaluesByRange(fund_id, offset, length) {
  const sql = `
  SELECT
    fn.*
  FROM
    fund_netvalue AS fn
  WHERE
    fn.fund_id = ?
  LIMIT ?, ?
  ;`;
  const values = [fund_id, offset, length];
  return queryDB(sql, values);
}

exports = module.exports = {
  countByFundId,
  findFundNetvaluesByFundId,
  findUserFundsNetvalueSumByUserId,
  findLatestFundNetvaluesByFundId,
  findFundNetvaluesByRange,
};
