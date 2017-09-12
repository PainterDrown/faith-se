function getUpdateSql(obj) {
  let sql = '';
  let hasFirstKey = false;
  for (let key in obj) {
    if (!hasFirstKey) {
      sql += `${key} = ?`;
      hasFirstKey = true;
    } else {
      sql += `, ${key} = ?`;
    }
  }
  return sql;
}

exports = module.exports = getUpdateSql;
