const mysql = require('mysql2/promise');

function createDatabasePool(databaseConfig) {
  return mysql.createPool({
    host: databaseConfig.host,
    port: databaseConfig.port,
    database: databaseConfig.database,
    user: databaseConfig.user,
    password: databaseConfig.password,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    namedPlaceholders: false,
  });
}

module.exports = {
  createDatabasePool,
};
