const Router = require('koa-router');
const UbcrCtrl = require('../controllers/user_bankcard');

const router = new Router({ prefix: '/bankcards' });

router.get('/',  UbcrCtrl.get);

exports = module.exports = router.routes();
