const user_routes = require('./user');

function loadRouters(app) {
  app.use(user_routes);
}

exports = module.exports = {
  loadRouters,
};
