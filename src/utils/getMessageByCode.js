const messgaes = require('../consts/messages');

function getMessageByCode(code) {
  const msg = messgaes[code + ''];
  return msg ? msg : messgaes['0'];
}

exports = module.exports = getMessageByCode;
