const { queryDb } = require('../services/db');

function findFundBuysByUserId(user_id) {
  const sql = `
  SELECT
    fb.*,
    user.bank_cardno,
    fund.name, fund.latest_netvalue
  FROM
    user,
    fund_buy AS fb,
    fund
  WHERE
    fb.user_id = ? AND
    user.user_id = fb.user_id AND
    fb.fund_id = fund.fund_id
  ;`;
  const values = [user_id];
  return queryDb(sql, values);
}

exports = module.exports = {
  findFundBuysByUserId,
};
