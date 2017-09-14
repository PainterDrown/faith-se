const Router = require('koa-router');
const FnvlCtrl = require('../controllers/fund_netvalue');

const router = new Router({ prefix: '/netvalues' });

router.get('/',
  FnvlCtrl.parse,
  FnvlCtrl.list
);

exports = module.exports = router.routes();
