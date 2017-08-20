const Router = require('koa-router');
const { getValidatorByFieldnames,
        getValidatorByRoute } = require('../services/validation');
const toMiddleware = require('../utils/toMiddleware');
const user_ctrl    = require('../controllers/user');

const router = new Router({ prefix: '/api' });

// 登陆
router.post('/login',
toMiddleware(getValidatorByFieldnames(['username', 'password'])),
  toMiddleware(user_ctrl.checkIfUserExistByUsername),
  toMiddleware(user_ctrl.checkIfPasswordCorrect),
  user_ctrl.loginSuccessfully
);

// 注册
router.post('/enroll',
  toMiddleware(getValidatorByFieldnames(['username', 'password'])),
  toMiddleware(user_ctrl.checkIfUnique(['username'])),
  user_ctrl.enrollSuccessfully
);

// 获取用户详情
router.post('/get-user-detail',
  toMiddleware(getValidatorByFieldnames(['user_id'])),
  user_ctrl.getUserDetail
);

// 实名认证
router.post('/realname-authentication',
  toMiddleware(getValidatorByRoute('/realname-authentication')),
  user_ctrl.checkIfUnique(['id', 'email', 'phone', 'bankcard_no'])
);

exports = module.exports = router.routes();
