class FaithError extends Error {
  constructor(code, msg, stack) {
    super(msg);
    this.code = code;
    if (!msg) {
      this.msg = '服务器内部错误';
    } else {
      this.msg = msg;
      this.stack = stack;
    }
  }
}

exports = module.exports = FaithError;
