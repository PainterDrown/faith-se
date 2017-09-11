const getMessageByCode = require('./getMessageByCode');

class FaithError extends Error {
  constructor(code, msg, stack) {
    super(msg);
    this.code = code;
    if (!msg) {
      this.msg = getMessageByCode(code);
    } else {
      this.msg = msg;
      this.stack = stack;
    }
  }
}

exports = module.exports = FaithError;
