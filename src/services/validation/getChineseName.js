const chinese_name = {
  'username': '用户名',
  'password': '密码',
  'user_id' : '用户ID',
}

function getChineseName(name) {
  return chinese_name[name];
}

exports = module.exports = getChineseName;
