const Router = require('koa-router');
const UbcrCtrl = require('../controllers/user_bankcard');

function RESTfulRoutes() {
  const router = new Router();
  router.get('/', UbcrCtrl.get);
  return router.routes();
}

const router = new Router({ prefix: '/bankcards' });

router.use('/', RESTfulRoutes());

exports = module.exports = router.routes();
