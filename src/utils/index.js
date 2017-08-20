function filter(objs, keys) {
  for (let obj of objs) {
    for (let key of keys) {
      delete obj[key];
    }
  }
}

function extract(objs, key) {
  const results = [];
  for (let obj of objs) {
    results.push(obj[key]);
  }
}

function sum(nums) {
  let result = 0.00;
  for (let num of nums) {
    result += num;
  }
  return result;
}

exports = module.exports = {
  filter,
  extract,
  sum,
};