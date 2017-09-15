const { queryDb } = require('../services/db');
const getUpdateSql = require('../utils/getUpdateSql');

function findUserTradesByUserId(user_id, offset, length) {
  let limit = '';
  if (offset && length) {
    limit = 'LIMIT ?, ?';
  }
  const sql = `
  SELECT
    fund.*,
    ut.amount, ut.vamount, ut.bankcard_no, ut.state AS ut_state, ut.operation, ut.turnover
  FROM
    user_trade AS ut,
    fund
  WHERE
    ut.user_id = ? AND
    ut.fund_id = fund.fund_id
  ${limit}
  ;`;
  const values = [user_id];
  return queryDb(sql, values);
}

function countByUserId(user_id) {
  const sql = `
  SELECT
    COUNT(ut.ut_id) AS count
  FROM
    user_trade AS ut
  WHERE
    ut.user_id = ?
  ;`;
  const values = [user_id];
  return queryDb(sql, values);
}

function insertTrade(trade) {
  let fieldnames = ''
  let fieldvalues = '';
  const values = [];
  for (const key in trade) {
    fieldnames += key + ', ';
    fieldvalues += '?, '
    values.push(trade[key]);
  }
  fieldnames = fieldnames.slice(0, fieldnames.length - 2);
  fieldvalues = fieldvalues.slice(0, fieldvalues.length - 2);
  const sql = `
  INSERT INTO user_trade (${fieldnames}) VALUES (${fieldvalues})
  ;`;
  return queryDb(sql, values);
}

exports = module.exports = {
  findUserTradesByUserId,
  countByUserId,
  insertTrade,
}
