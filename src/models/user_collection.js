const { queryDB } = require('../services/db');

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
  return queryDB(sql, values);
}

function findByUserIdAndFundId(user_id, fund_id) {
  const sql = `
  SELECT
    uc.*
  FROM
    user_collection AS uc
  WHERE
    uc.user_id = ? AND
    uc.fund_id = ?
  ;`;
  const values = [user_id, fund_id];
  return queryDB(sql, values);
}

function insert(user_id, fund_id) {
  const sql = `
  INSERT INTO user_collection (user_id, fund_id) VALUES (?, ?)
  ;`;
  const values = [user_id, fund_id];
  return queryDB(sql, values);
}

exports = module.exports = {
  findUserCollectionsByUserId,
  findByUserIdAndFundId,
  insert,
};
