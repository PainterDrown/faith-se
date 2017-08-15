const { promisify } = require('util');

/**
 * 对某个对象的所有函数进行promisify
 * @param  {Object} obj    某个对象
 * @param  {String} suffix 函数名后缀
 * @return {Object}
 */
function promisifyAll(obj, suffix = 'Async') {
  for (const [key, value] of Object.entries(obj)) {
    const promisifiedKey = key + suffix;
    const isNotSimpleFunc = (Object.prototype.toString.call(value) !== '[object Function]');
    const hasPromisifiedKey = Reflect.hasOwnProperty.call(obj, promisifiedKey);
    if (isNotSimpleFunc || hasPromisifiedKey) continue;
    obj[promisifiedKey] = promisify(value);
  }
  return obj;
}

exports = module.exports = promisifyAll;
