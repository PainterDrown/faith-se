const moment = require('moment');

function toDateString(date) {
  if (date instanceof Array) {
    const ret = [];
    for (const d of date) {
      ret.push(moment(d).format('YYYY-MM-DD'));
    }
    return ret;
  }
  return moment(date).format('YYYY-MM-DD');
}

function toTimeString(time) {
  if (time instanceof Array) {
    const ret = [];
    for (const t of time) {
      ret.push(moment(t).format('YYYY-MM-DD hh:mm:ss'));
    }
    return ret;
  }
  return moment(time).format('YYYY-MM-DD hh:mm:ss');
}

function attributeToDateString(key, objs) {
  for (const obj of objs) {
    obj[key] = toDateString(obj[key]);
  }
}

exports = module.exports = {
  toDateString,
  toTimeString,
  attributeToDateString,
};
