const Router = require('koa-router');
const { catchParam } = require('../utils/koa');
const FundCtrl = require('../controllers/fund');

// 挂载users的子路由
function loadSubRouters(router) {
  router.use(require('./fund_netvalue'));
}

function fundRoutes() {
  const router = new Router();
  router.get('/', FundCtrl.get);
  loadSubRouters(router);
  return router.routes();
}

const router = new Router({ prefix: '/api/funds' });

// 捕获user_id参数
router.param('fund_id',
  catchParam('fund_id')
);

// RESTful路由
router.use('/:fund_id', fundRoutes());

// 获取基金列表
router.get('/',
  FundCtrl.index
);

exports = module.exports = router.routes();
