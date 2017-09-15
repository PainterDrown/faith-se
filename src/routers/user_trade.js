const Router = require('koa-router');
const UtrdCtrl = require('../controllers/user_trade');

const router = new Router({ prefix: '/trades' });

// 获取用户购买记录
router.get('/',
  UtrdCtrl.parse,
  UtrdCtrl.list
);

// 用户购买基金
router.post('/',
  UtrdCtrl.buy
);

exports = module.exports = router.routes();
