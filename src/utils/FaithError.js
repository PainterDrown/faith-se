class FaithError extends Error {
  constructor(code, msg, stack) {
    super(msg);
    this.msg = msg;
    this.code = code;
    this.stack = stack;
  }
}

exports = module.exports = FaithError;
