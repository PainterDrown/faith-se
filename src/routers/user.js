const Router = require('koa-router');
const { getValidatorByRoute } = require('../services/validation');
const toMiddleware = require('../utils/toMiddleware');
const user_ctrl = require('../controllers/user');

const router = new Router();

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

exports = module.exports = router.routes();
