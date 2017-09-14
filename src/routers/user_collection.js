const Router = require('koa-router');
const UcltCtrl = require('../controllers/user_collection');

const router = new Router({ prefix: '/collections' });

router.post('/', UcltCtrl.post);

exports = module.exports = router.routes();
