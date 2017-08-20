const { queryDb } = require('../services/db');

function findFundsByUserId(user_id) {
  const sql = `
  SELECT
    fb.*
  FROM
    user
    fund_buy AS fb
  WHERE
    fb.user_id = ? AND
    user.user_id = fb.user_id
  ;`;
  const values = [user_id];
  return queryDb(sql, values);
}

exports = module.exports = {
  findFundsByUserId,
};
