const FaithError = require('../utils/FaithError');

function divideSomeAttribute(key, divisor, objs) {
  for (const obj of objs) {
    obj[key] /= divisor;
  }
}

/**
 * @description 对对象数组中的某个对象属性求和
 * @param  {string}   key  属性名
 * @param  {[object]} objs 对象数组
 * @return {number} 
 */
function sum(nums) {
  let result = 0.00;
  for (let num of nums) {
    result += num;
  }
  return result;
}

function parsePageAndPerPage(page, per_page, total) {
  let length = per_page;
  // 检查参数是否超出范围
  const offset = (page - 1) * parseInt(per_page);
  if (total === 0) {
    throw new FaithError(2, '记录数目为0');
  }
  if (offset >= total) {
    throw new FaithError(2, `参数page或per_page太大`);
  }
  if (offset + length > total) {
    length = total - offset;
  }
  return { offset, length };
}

exports = module.exports = {
  divideSomeAttribute,
  sum,
  parsePageAndPerPage,
};
