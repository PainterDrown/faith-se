const UserModl = require('../../models/user');
const FundModl = require('../../models/fund');

const check = {};

check.unique = {
  username: async (username) => {
    const [user] = await UserModl.findUsersByUsernames([ctx.param.username]);
    if (user) {
      throw new FaithError(2, `username已被使用`);
    }
  },
};

check.exist = {
  user_id: async (user_id) => {
    const [user] = await UserModl.findUsersByIds([user_id]);
    if (!user) {
      throw new FaithError(2, 'user_id不存在');
    }
  },

  username: async (username) => {
    const [user] = await UserModl.findUsersByUsernames([ctx.param.username]);
    if (!user) {
      throw new FaithError(2, 'username不存在');
    }
  },

  fund_id: async (fund_id) => {
    const [fund] = await FundModl.findFundsByIds([fund_id]);
    if (!fund) {
      throw new FaithError(2, 'fund_id不存在');
    }
  },
};

exports = module.exports = check;
