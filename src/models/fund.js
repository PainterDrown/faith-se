const { queryDb } = require('../services/db');

function countAllFunds() {
  const sql = `
  SELECT
    COUNT(*)
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
    fund,
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

exports = module.exports = {
  countAllFunds,
  findFundsByFundIdRange,
  findFundsByIds,
};