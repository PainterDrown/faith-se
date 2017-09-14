const FaithError = require('../../utils/FaithError');

function validate(key, value) {
  const schema = require('./schemas')[key];
  if (value === null || value === undefined)
    throw new FaithError(6, `缺乏参数：${key}`);
  if (typeof value !== schema.type) 
    throw new FaithError(2, `${key}类型不对`);
  if (schema.type === 'string') {
    if (schema.min_length && value.length < schema.min_length)
      throw new FaithError(2, `${key}太短`);
    if (schema.max_length && value.length > schema.max_length)
      throw new FaithError(2, `${key}太长`);
    if (schema.regex && !schema.regex.test(value))
      throw new FaithError(2, `${key}格式不对`);
  } else if (schema.type === 'number') {
    if (schema.min && value < schema.min)
      throw new FaithError(2, `${key}数值太小`);
    if (schema.max && value > schema.max)
      throw new FaithError(2, `${key}数值太大`);
  } else {
    throw new FaithError(2, `${key}类型不对`);
  }
}

exports = module.exports = validate;
