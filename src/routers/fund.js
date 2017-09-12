const Router = require('koa-router');
const toMiddleware = require('../utils/toMiddleware');
const { catchParam } = require('../utils');
const FundCtrl = require('../controllers/fund');
const validators = require('../services/validation/validators');

function fundRoutes() {
  const router = new Router();
  router.get('/', FundCtrl.get);
  return router.routes();
}

const router = new Router({ prefix: '/api' });

// 捕获user_id参数
router.param('fund_id',
  catchParam('fund_id'),
  toMiddleware(validators.getValidatorByKeys(['fund_id']))
);

// RESTful路由
router.use('/funds/:fund_id', fundRoutes());

router.get('/fund/list',
  toMiddleware(validators.getValidatorByRoute('/fund/list')),
  FundCtrl.parse,
  FundCtrl.list
);

router.get('/fund/recommendations',
  toMiddleware(validators.getValidatorByRoute('/fund/recommendations')),
  FundCtrl.recommend
);

exports = module.exports = router.routes();
