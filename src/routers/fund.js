const Router = require('koa-router');
const { catchParam } = require('../utils');
const FundCtrl = require('../controllers/fund');

// 挂载users的子路由
function loadSubRouters(router) {
  router.use(require('./fund_netvalues'));
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
  FundCtrl.parse,
  FundCtrl.list
);

// 获取基金推荐列表
router.get('/recommendations',
  FundCtrl.recommend
);

// 获取即将上市的基金列表
router.get('/soon',
  FundCtrl.soon
);

exports = module.exports = router.routes();
