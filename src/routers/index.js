function loadRouters(app) {
  app.use(require('./user'));
  app.use(require('./fund'));
}

exports = module.exports = {
  loadRouters,
};
