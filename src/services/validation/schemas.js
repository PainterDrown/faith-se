/**
 * @description 产生数据范式
 * @param  {string} type       类型
 * @param  {number} lowerbound 下界
 * @param  {number} upperbound 上届
 * @param  {string} regex      正则表达式
 * @return {object}            对应的数据范式对象
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

const schemas = {};

schemas.user_id     = generateSchema('number', 1, null);
schemas.username    = generateSchema('string', 6, 32);
schemas.password    = generateSchema('string', 1, 32);
schemas.realname    = generateSchema('string', 1, 32);
schemas.id          = generateSchema('string', 18, 18);
schemas.email       = generateSchema('string', 1, 64);
schemas.phone       = generateSchema('string', 11, 11);
schemas.bank_name   = generateSchema('string', 1, 64);
schemas.bank_area   = generateSchema('string', 1, null);
schemas.bank_phone  = generateSchema('string', 11, 11);
schemas.bank_cardno = generateSchema('string', 15, 19);
schemas.tcode       = generateSchema('number', 0, 999999);

exports = module.exports = schemas;
