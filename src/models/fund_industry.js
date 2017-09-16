const { queryDB } = require('../services/db');

function findFundIndustriesByFundId(fund_id) {
  const sql = `
  SELECT
    fi.*
  FROM
    fund_industry AS fi
  WHERE
    fi.fund_id = ?
  ;`;
  const values = [fund_id];
  return queryDB(sql, values);
}

exports = module.exports = {
  findFundIndustriesByFundId
};
