const { queryDb } = require('../services/db');
const getUpdateSql = require('../utils/getUpdateSql');
const FaithError = require('../utils/FaithError');

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

/**
 * @description 根据obj里面的字段去查询数据库中的用户
 * @param  {object} info 
 */
function findUserByInfo(info) {
  let conditions = '';
  let hasFirstFieldname = false;
  const values = [];
  for (let fieldname in info) {
    if (hasFirstFieldname) {
      conditions += ` OR user.${fieldname} = ?`;
    } else {
      conditions += `user.${fieldname} = ?`;
    }
    values.push(info[fieldname]);
    hasFirstFieldname = true;
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

function updateUser(user_id, info) {
  const values = [];
  for (let fieldname in info) {
    values.push(info[fieldname]);
  }
  const update_sql = getUpdateSql(info);
  if (update_sql === '') {
    throw new FaithError(0, '缺乏更新的参数');
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
  findUserByInfo,
  updateUser,
};
