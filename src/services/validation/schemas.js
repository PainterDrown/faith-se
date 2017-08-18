/**
 * @description 产生数据范式
 * @param  {String} type       类型
 * @param  {Number} lowerbound 下界
 * @param  {Number} upperbound 上届
 * @param  {String} regex      正则表达式
 * @return {Object}            对应的数据范式对象
 */
function generateSchema(type, lowerbound, upperbound, regex) {
  if (type === 'string')
    return {
      type: type,
      min_length: lowerbound,
      max_length: upperbound,
      regex: regex,
    }
  else if (type === 'number')
    return {
      type,
      min: lowerbound,
      max: upperbound,
    };
}

const username = generateSchema('string', 6, 32);
const password = generateSchema('string', 1, 32);

exports = module.exports = {
  username,
  password,
};
