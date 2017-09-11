function rename(oldkeys, newkeys, objs) {
  for (const obj of objs) {
    for (let i = 0; i < oldkeys.length; ++i) {
      obj[newkeys[i]] = obj[oldkeys[i]];
      delete obj[oldkeys[i]];
    }
  }
}

function pick(keys, objs) {
  for (const obj of objs) {
    for (const key of obj) {
      if (keys.indexOf(key) === -1) {
        delete obj[key];
      }
    }
  }
}

function filter(keys, objs) {
  for (const obj of objs) {
    for (const key of keys) {
      delete obj[key];
    }
  }
}

/**
 * @description 将对象数组中的某个对象属性提取成一个数组
 * @param  {string}   key  属性名
 * @param  {[object]} objs 对象数组
 * @return {[any]} 
 */
function extract(key, objs) {
  const results = [];
  for (let obj of objs) {
    results.push(obj[key]);
  }
  return results;
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

function catchParam(param_name) {
  return async (param, ctx, next) => {
    ctx.param[param_name] = param;
    return next();
  }
}

exports = module.exports = {
  rename,
  pick,
  filter,
  extract,
  sum,
  catchParam,
};