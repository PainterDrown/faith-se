function getUpdateSql(info) {
  let sql = '';
  let hasFirstFieldname = false;
  for (let fieldname in info) {
    if (!hasFirstFieldname) {
      sql += `${fieldname} = ?`;
      hasFirstFieldname = true;
    } else {
      sql += `, ${fieldname} = ?`;
    }
  }
  return sql;
}

exports = module.exports = getUpdateSql;
