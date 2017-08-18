const chinese_name = {
  'username': '用户名',
  'password': '密码',
}

function getChineseName(name) {
  return chinese_name[name];
}

exports = module.exports = getChineseName;
