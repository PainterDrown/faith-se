const { check, checkIfExist } = require('./index');
const FaithError = require('../../utils/FaithError');

function getValidatorByRoute(route) {
  switch (route) {
    case '/certificate':
      return (obj) => {
        const keysToBeValidated = [
          'user_id',
          'realname',
          'id',
          'bank_name',
          'bank_area',
          'bank_phone',
          'bank_cardno',
          'tcode'];
        for (let key of keysToBeValidated) {
          check(key, obj[key]);
        }
      }
    case '/fund/list':
      return (obj) => {
        const keys = ['page', 'per_page'];
        for (const key of keys) {
          checkIfExist(key, obj[key])
        }
      }
    case '/fund/recommendations':
      return (obj) => {
        checkIfExist('num', obj['num']);
      }
    default:
      throw new FaithError(0, '找不到该路由对应的验证器');
  }
}
  
function getValidatorByKeys(keys) {
  return (obj) => {
    for (let key of keys) {
      check(key, obj[key]);
    }
  }
}

exports = module.exports = {
  getValidatorByRoute,
  getValidatorByKeys,
};
