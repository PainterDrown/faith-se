const fees = {
  fund_subscribe: {
    categories: ['0.0≤万元＜100.0', '100.0≤万元＜500.0', '500.0≤万元'],
    values: ['0.60%', '0.40%', '1000.0元'],
  },

  fund_purchase: {
    categories: ['0.0≤万元＜100.0', '100.0≤万元＜300.0', '300.0≤万元＜500.0', '500.0≤万元'],
    values: ['1.50%', '1.00%', '0.30%', '1000.0元'],
    limitations: [],
  },

  fund_redeem: {
    categories: [],
    values: [],
    limitations: [],
  },

  others: {
    values: ['0.00%', '1.50%', '0.25%'],
  },
};

exports = module.exports = fees;
