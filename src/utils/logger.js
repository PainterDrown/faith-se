const FaithError = require('./FaithError');
const logger = {};

logger.log = (msg) => {
  const time = new Date().toLocaleString();
  console.log(`${time}    [1]✅ ${msg}`);
}

logger.error = (err) => {
  if (!(err instanceof FaithError)) {
    err.code = 0;
    err.msg = err.stack;
  }
  const time = new Date().toLocaleString();
  if (err.code === -1)
    console.error(`${time}    [${err.code}]❌ ${err.msg}`);
  else
    console.error(`${time}    [${err.code}]⚠️ ${err.msg}`);
}

exports = module.exports = logger;
