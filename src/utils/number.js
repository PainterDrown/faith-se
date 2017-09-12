function divideSomeAttribute(key, divisor, objs) {
  for (const obj of objs) {
    obj[key] /= divisor;
  }
}

exports = module.exports = {
  divideSomeAttribute,
};
