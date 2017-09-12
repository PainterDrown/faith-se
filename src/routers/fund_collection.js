const Router = require('koa-router');
const toMiddleware = require('../utils/toMiddleware');
const { catchParam } = require('../utils');
const validators = require('../services/validation/validators');
const FcltCtrl = require('../models/fund_collection');

function fundCollectionRoutes() {
  const router = new Router();
  router.post('/', FcltCtrl.post);
  return router.routes();
}

const router = new Router({ prefix: '/fund_collections' });

router.param('fc_id',
  catchParam('fc_id')
);

// RESTful路由
router.use('/:fc_id', fundCollectionRoutes());