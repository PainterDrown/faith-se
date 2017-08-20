const { queryDb } = require('../services/db');

function getUserFundsNetvalueSumByUserId(user_id) {
  const sql = `
  SELETE
    SUM(fn.netvalue)
  FROM
    fund_netvalue AS fn,
    fund_buy AS fb
  WHERE
    fb.user_id = ? AND
    fb.fund_id = fn.fund_id
  `;
  const values = [user_id];
  return queryDb(sql, values);
}

exports = module.exports = {
  getUserFundsNetvalueSumByUserId,
};
