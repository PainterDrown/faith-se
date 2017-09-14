const Router = require('koa-router');
const { catchParam } = require('../utils');
const UserCtrl = require('../controllers/user');

// 挂载users的子路由
function loadSubRouters(router) {
  router.use(require('./user_collection'));
  router.use(require('./user_bankcard'));
  router.use(require('./user_trade'));
}

// 挂载users的路由
function RESTfulRoutes() {
  const router = new Router();
  router.get('/', UserCtrl.get);
  router.put('/', UserCtrl.put);
  loadSubRouters(router);
  return router.routes();
}

const router = new Router({ prefix: '/api/users' });

// 捕获user_id参数
router.param('user_id',
  catchParam('user_id')
);

router.use('/:user_id', RESTfulRoutes());

// 注册
router.post('/signup',
  UserCtrl.signup
);

// 登陆
router.post('/signin',
  UserCtrl.signin
);

// 实名认证
router.post('/certificate',
  UserCtrl.certificate
);

// 咨询
router.post('/consult',
  UserCtrl.consult
);

exports = module.exports = router.routes();
