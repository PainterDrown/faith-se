const userRoutes = require('./user');
const fundRoutes = require('./fund');

function loadRouters(app) {
  app.use(userRoutes);
  app.use(fundRoutes);
}

exports = module.exports = {
  loadRouters,
};
