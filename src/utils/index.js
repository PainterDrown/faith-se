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
    for (const key in obj) {
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
  const result = [];
  for (const obj of objs) {
    result.push(obj[key]);
  }
  return result;
}

exports = module.exports = {
  rename,
  pick,
  filter,
  extract,
};