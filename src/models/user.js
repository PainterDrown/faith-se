const { queryDb } = require('../services/db');

function findUsersBySomeField(fieldname, fieldvalues) {
  const sql = `
  SELECT
    *
  FROM
    user
  WHERE
    user.${fieldname} IN (?)
  ;`;
  const values = [fieldvalues];
  return queryDb(sql, values);
}

/**
 * @description 查询用户（根据用户ID）
 * @param  {[string]} user_ids 用户名数组
 * @return {Promise}           用户数组
 */
function findUsersByIds(user_ids) {
  return findUsersBySomeField('user_id', user_ids);
}

/**
 * @description 查询用户（根据用户名）
 * @param  {[string]} usernames 用户名数组
 * @return {Promise}            用户数组
 */
function findUsersByUsernames(usernames) {
  return findUsersBySomeField('username', usernames);
}

function insertUser(user) {
  const sql = `
  INSERT INTO user (username, password) VALUES (?, ?)
  ;`;
  const values = [user.username, user.password];
  return queryDb(sql, values);
}

exports = module.exports = {
  findUsersByIds,
  findUsersByUsernames,
  insertUser,
};
