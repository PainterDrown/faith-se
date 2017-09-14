const { queryDb } = require('../services/db');

function findBankcardsByUserId(user_id) {
  const sql = `
  SELECT
  FROM
    user_bankcard AS ub
  WHERE
    ub.user_id = ?
  ;`;
  const values = [user_id];
  return queryDb(sql, values);
}

exports = module.exports = {
  findBankcardsByUserId,
}