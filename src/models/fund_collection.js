const { queryDb } = require('../services/db');

function findFundCollectionsByUserId(user_id) {
  const sql = `
  SELECT
    fund.*
  FROM
    fund_collection AS fc,
    fund
  WHERE
    fc.user_id = ? AND
    fc.fund_id = fund.fund_id
  ;`;
  const values = [user_id];
  return queryDb(sql, values);
}

exports = module.exports = {
  findFundCollectionsByUserId,
};
