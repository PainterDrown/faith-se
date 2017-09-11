const Router = require('koa-router');
const toMiddleware = require('../utils/toMiddleware');
const { catchParam } = require('../utils');
const fc = require('../controllers/fund');
const validators = require('../services/validation/validators');

function fundRoutes() {
  const router = new Router();
  router.get('/', fc.detail);
  return router.routes();
}

const router = new Router({ prefix: '/api/funds' });

// 捕获user_id参数
router.param('fund_id',
  catchParam('fund_id'),
  toMiddleware(validators.getValidatorByFieldnames(['fund_id']))
);

// RESTful路由
router.use('/:fund_id', fundRoutes());

exports = module.exports = router.routes();
