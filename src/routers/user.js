const Router = require('koa-router');
const toMiddleware = require('../utils/toMiddleware');
const { catchParam } = require('../utils');
const uc = require('../controllers/user');
const validators = require('../services/validation/validators');

function userRoutes() {
  const router = new Router();
  router.get('/', uc.detail);
  return router.routes();
}

const router = new Router({ prefix: '/api/users' });

// 捕获user_id参数
router.param('user_id',
  catchParam('user_id'),
  toMiddleware(validators.getValidatorByFieldnames(['user_id']))
);

// RESTful路由
router.use('/:user_id', userRoutes());

// 登陆
router.post('/login',
  toMiddleware(validators.getValidatorByFieldnames(['username', 'password'])),
  toMiddleware(uc.checkIfExist(['username'])),
  toMiddleware(uc.checkIfCorrect(['password'])),
  uc.login
);

// 注册
router.post('/enroll',
  toMiddleware(validators.getValidatorByFieldnames(['username', 'password'])),
  toMiddleware(uc.checkIfUnique(['username'])),
  uc.enroll
);

// 实名认证
router.post('/certificate',
  toMiddleware(validators.getValidatorByRoute('/certificate')),
  toMiddleware(uc.checkIfExist(['user_id'])),
  toMiddleware(uc.checkIfUnique(['id', 'bank_phone', 'bank_cardno'])),
  uc.certificate
);

exports = module.exports = router.routes();
