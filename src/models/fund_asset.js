const { queryDb } = require('../services/db');

function findFundAssetsByFundId(fund_id) {
  const sql = `
  SELECT
    fa.*
  FROM
    fund_asset AS fa
  WHERE
    fa.fund_id = ?
  ;`;
  const values = [fund_id];
  return queryDb(sql, values);
}

exports = module.exports = {
  findFundAssetsByFundId,
};
