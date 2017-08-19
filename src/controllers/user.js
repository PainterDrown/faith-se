const { queryDb } = require('../services/db');
const FaithError  = require('../utils/FaithError');
const UserModel   = require('../models/user');
const sendJson    = require('../utils/sendJson');

async function checkIfUserExistByUsername(param_data) {
  try {
    console.log(param_data);
    console.log(typeof param_data.username);
    const user = await UserModel.findUsersByUsernames([param_data.username]);
    if (user.length < 1)
      throw new FaithError(3, '用户不存在');
    param_data.user = user[0];
  } catch(err) {
    throw(err);
  }
}

async function checkIfUserNotExistByUsername(param_data) {
  try {
    const user = await UserModel.findUsersByUsernames([param_data.username]);
    if (user.length > 0)
      throw new FaithError(4, '用户名已存在');
  } catch(err) {
    throw(err);
  }
}

function checkIfPasswordCorrect(param_data) {
  if (param_data.password !== param_data.user.password)
    throw new FaithError(5, '密码错误');
}

function loginSuccessfully(ctx, next) {
  sendJson(ctx, { user_id: ctx.param_data.user.user_id });
  return next();
}

async function enrollSuccessfully(ctx, next) {
  await UserModel.insertUser(ctx.param_data);
  const user = await UserModel.findUsersByUsernames(ctx.param_data.username);
  sendJson(ctx, { user_id: user[0].user_id });
  return next();
}

exports = module.exports = {
  checkIfUserExistByUsername,
  checkIfUserNotExistByUsername,
  checkIfPasswordCorrect,
  loginSuccessfully,
  enrollSuccessfully,
}
