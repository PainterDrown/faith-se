const { queryDb } = require('../services/db');
const getUpdateSql = require('../utils/getUpdateSql');
const FaithError = require('../utils/FaithError');

function findUsersBySomeField(key, fieldvalues) {
  const sql = `
  SELECT
    *
  FROM
    user
  WHERE
    user.${key} IN (?)
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

/**
 * @description 根据obj里面的字段去查询数据库中的用户
 * @param  {object} obj 
 */
function findUserByObject(obj) {
  let conditions = '';
  let hasFirstKey = false;
  const values = [];
  for (let key in obj) {
    if (hasFirstKey) {
      conditions += ` OR user.${key} = ?`;
    } else {
      conditions += `user.${key} = ?`;
    }
    values.push(obj[key]);
    hasFirstKey = true;
  }
  const sql = `
  SELECT
    user.*
  FROM
    user
  WHERE
    ${conditions}
  ;`;
  return queryDb(sql, values);
}

function updateUser(user_id, user) {
  const values = [];
  for (let key in user) {
    values.push(user[key]);
  }
  const update_sql = getUpdateSql(user);
  if (update_sql === '') {
    throw new FaithError(2, '更新用户信息至少需要一个新参数');
  }
  const sql = `
  UPDATE
    user
  SET
    ${update_sql}
  WHERE
    user.user_id = ?
  ;`;
  values.push(user_id);
  return queryDb(sql, values);
}

exports = module.exports = {
  findUsersByIds,
  findUsersByUsernames,
  insertUser,
  findUserByObject,
  updateUser,
};
