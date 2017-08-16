class FaithError extends Error {
  constructor(code, name, err) {
    super(err.msg);
    this.code = code;
    this.name = name;
    this.stack = err.stack;
  }
}

exports = module.exports = FaithError;
