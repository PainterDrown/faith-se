const Router = require('koa-router');
const UtrdCtrl = require('../controllers/user_trade');

function RESTfulRoutes() {
  const router = new Router();
  router.get('/',
    UtrdCtrl.parse,
    UtrdCtrl.list
  );
  router.post('/',
    UtrdCtrl.buy
  );
  return router.routes();
}

const router = new Router({ prefix: '/trades' });

router.use('/', RESTfulRoutes());

router.get('/fee',
  UtrdCtrl.fees
);

exports = module.exports = router.routes();
