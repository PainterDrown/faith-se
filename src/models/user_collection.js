const { queryDb } = require('../services/db');

function findUserCollectionsByUserId(user_id) {
  const sql = `
  SELECT
    fund.*
  FROM
    user_collection AS uc,
    fund
  WHERE
    uc.user_id = ? AND
    uc.fund_id = fund.fund_id
  ;`;
  const values = [user_id];
  return queryDb(sql, values);
}

exports = module.exports = {
  findUserCollectionsByUserId,
};
