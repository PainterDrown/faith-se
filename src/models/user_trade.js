const { queryDb } = require('../services/db');

function findUserTradesByUserId(user_id) {
  const sql = `
  SELECT
    ut.*,
    fund.name, fund.code
  FROM
    user_trade AS ut,
    fund
  WHERE
    ut.user_id = ? AND
    ut.fund_id = fund.fund_id
  ;`;
  const values = [user_id];
  return queryDb(sql, values);
}

function countByUserId(user_id) {
  const sql = `
  SELECT
    COUNT(ut)
  FROM
    user_trade AS ut
  WHERE
    ur.user_id = ?
  ;`;
  const values = [user_id];
  return queryDb(sql, values);
}

exports = module.exports = {
  findUserTradesByUserId,
  countByUserId,
}
