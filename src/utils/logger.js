// 暂时用console
const logger = console;

logger.logMessage = (...rest) => {
  const time = new Date();
  logger.log(...rest);
}

logger.logError = (err, ...rest) => {
  if (typeof err !== Error) return;
  const time = new Date();
  logger.error(time, err.name, err.message, err.stack, ...rest);
}

exports = module.exports = logger;
