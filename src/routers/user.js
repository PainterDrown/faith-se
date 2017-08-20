const Router = require('koa-router');
const { getValidatorByRoute, getValidatorByFieldnames } = require('../services/validation');
const toMiddleware = require('../utils/toMiddleware');
const user_ctrl    = require('../controllers/user');

const router = new Router({ prefix: '/api' });

// 登陆
router.post('/login',
  toMiddleware(getValidatorByRoute('/login')),
  toMiddleware(user_ctrl.checkIfUserExistByUsername),
  toMiddleware(user_ctrl.checkIfPasswordCorrect),
  user_ctrl.loginSuccessfully
);

// 注册
router.post('/enroll',
  toMiddleware(getValidatorByRoute('/enroll')),
  toMiddleware(user_ctrl.checkIfUserNotExistByUsername),
  user_ctrl.enrollSuccessfully
);

// 获取用户详情
router.post('/get-user-detail',
  toMiddleware(getValidatorByFieldnames(['user_id'])),
  user_ctrl.getUserDetail
);

exports = module.exports = router.routes();
