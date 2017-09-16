const { queryDB } = require('../services/db');

function findBankcardsByUserId(user_id) {
  const sql = `
  SELECT
    ub.*
  FROM
    user_bankcard AS ub
  WHERE
    ub.user_id = ?
  ;`;
  const values = [user_id];
  return queryDB(sql, values);
}

function insertBankcard(user_id, bankcard) {
  const sql = `
  INSERT INTO user_bankcard
    (user_id, bank_name, bank_area, bank_phone, number) VALUES
    (?, ?, ?, ?, ?)
  ;`;
  const values = [user_id,
    bankcard.bank_name,
    bankcard.bank_area,
    bankcard.bank_phone,
    bankcard.bankcard_no];
  return queryDB(sql, values);
}

exports = module.exports = {
  findBankcardsByUserId,
  insertBankcard,
}