const { check } = require('./index');
const FaithError = require('../../utils/FaithError');

function getValidatorByRoute(route) {
  switch (route) {
    case '/certificate':
      return (obj) => {
        const fieldnamesToBeValidated = [
          'user_id',
          'realname',
          'id',
          'bank_name',
          'bank_area',
          'bank_phone',
          'bank_cardno',
          'tcode'];
        for (let fieldname of fieldnamesToBeValidated) {
          check(fieldname, obj[fieldname]);
        }
      }
    default:
      throw new FaithError(0, '找不到该路由对应的验证器');
  }
}
  
function getValidatorByFieldnames(fieldnames) {
  return (obj) => {
    for (let fieldname of fieldnames) {
      check(fieldname, obj[fieldname]);
    }
  }
}

exports = module.exports = {
  getValidatorByRoute,
  getValidatorByFieldnames,
};
