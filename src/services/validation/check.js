const FaithError     = require('../../utils/FaithError');
const getChineseName = require('./getChineseName');

function check(fieldname, data) {
  const schema = require('./schemas')[fieldname];
  const chinese_name = getChineseName(fieldname);
  if (data === null || data === undefined)
    throw new FaithError(6, `缺乏参数：${chinese_name}`);
  if (typeof data !== schema.type) 
    throw new FaithError(2, `${chinese_name}类型不对`);
  if (schema.type === 'string') {
    if (schema.min_length && data.length < schema.min_length)
      throw new FaithError(2, `${chinese_name}太短`);
    if (schema.max_length && data.length > schema.max_length)
      throw new FaithError(2, `${chinese_name}太长`);
    if (schema.regex && !schema.regex.test(data))
      throw new FaithError(2, `${chinese_name}格式不对`);
  } else if (schema.type === 'number') {
    if (schema.min && data < schema.min)
      throw new FaithError(2, `${chinese_name}数值太小`);
    if (schema.max && data > schema.max)
      throw new FaithError(2, `${chinese_name}数值太大`);
  } else {
    throw new FaithError(2, `${chinese_name}类型不对`);
  }
}

exports = module.exports = check;
