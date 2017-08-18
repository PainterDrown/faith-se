const FaithError = require('../../utils/FaithError');
const check      = require('./check');

function getValidatorByRoute(route) {
  switch (route) {
    case '/login':
      return (param_data) => {
        check('username', param_data.username);
        check('password', param_data.password);
      };
    case '/enroll':
      return (param_data) => {
        check('username', param_data.username);
        check('password', param_data.password);
      }
    default:
      throw new FaithError(0, '找不到该路由对应的验证器');
  }
}

exports = module.exports = {
  getValidatorByRoute,
};
