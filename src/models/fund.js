const { queryDB } = require('../services/db');

function count() {
  const sql = `
  SELECT
    COUNT(*) AS count
  FROM
    fund
  ;`;
  return queryDB(sql, []);
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
  return queryDB(sql, values);
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
  return queryDB(sql, values);
}

exports = module.exports = {
  count,
  findFundsByRange,
  findFundsByIds,
};
