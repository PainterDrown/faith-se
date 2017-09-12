const { queryDb } = require('../services/db');

function countAllFunds() {
  const sql = `
  SELECT
    COUNT(*) AS count
  FROM
    user
  ;`;
  return queryDb(sql, []);
}

function findFundsByFundIdRange(offset, length) {
  const sql = `
  SELECT
    fund.*
  FROM
    fund
  LIMIT ?, ?
  ;`;
  const values = [offset, length];
  return queryDb(sql, values);
}

function findFundsByIds(fund_ids) {
  const sql = `
  SELECT
    fund.*
  FROM
    fund
  WHERE
    fund.fund_id IN (?)
  ;`;
  const values = [fund_ids];
  return queryDb(sql, values);
}

// 根据净值大小推荐
function recommend(num) {
  const sql = `
  SELECT
    fund.*
  FROM
    fund
  ORDER BY fund.latest_netvalue DESC
  LIMIT 0, ?
  ;`;
  const values = [num];
  return queryDb(sql, values);
}

exports = module.exports = {
  countAllFunds,
  findFundsByFundIdRange,
  findFundsByIds,
  recommend,
};