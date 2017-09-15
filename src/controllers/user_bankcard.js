const UbcrModl = require('../models/user_bankcard');
const { sendJson } = require('../utils/koa');
const { rename } = require('../utils');

async function get(ctx, next) {
  const bankcards = await UbcrModl.findBankcardsByUserId(ctx.param.user_id);
  rename(
    ['bank_name', 'bank_area', 'bank_phone', 'bank_cardno'],
    ['bankname', 'bankarea', 'bankphone', 'bankcard_no'],
    bankcards,
  );
  sendJson(ctx, { bankcards });
}

exports = module.exports = {
  get,
};
