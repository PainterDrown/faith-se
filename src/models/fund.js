const { queryDb } = require('../services/db');

function count() {
  const sql = `
  SELECT
    COUNT(*) AS count
  FROM
    user
  ;`;
  return queryDb(sql, []);
}

function findFundsByRange(offset, length) {
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

exports = module.exports = {
  count,
  findFundsByRange,
  findFundsByIds,
};
