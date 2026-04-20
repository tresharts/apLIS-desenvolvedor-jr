const path = require('node:path');
const dotenv = require('dotenv');

dotenv.config({
  path: path.resolve(__dirname, '../../.env'),
  quiet: true,
});

const REQUIRED_ENV_VARS = [
  'PORT',
  'DB_HOST',
  'DB_PORT',
  'DB_DATABASE',
  'DB_USERNAME',
  'DB_PASSWORD',
];

function readEnv(name, fallback) {
  const value = process.env[name];

  if (value !== undefined && value !== '') {
    return value;
  }

  return fallback;
}

function validateEnv() {
  const missing = REQUIRED_ENV_VARS.filter((name) => {
    const value = process.env[name];

    return value === undefined || value === '';
  });

  if (missing.length > 0) {
    throw new Error(
      `Variáveis de ambiente ausentes: ${missing.join(', ')}`
    );
  }
}

validateEnv();

module.exports = {
  app: {
    port: Number(readEnv('PORT', '3000')),
    corsOrigin: readEnv('CORS_ORIGIN', ''),
  },
  database: {
    host: readEnv('DB_HOST', '127.0.0.1'),
    port: Number(readEnv('DB_PORT', '3306')),
    database: readEnv('DB_DATABASE', 'aplis_teste'),
    user: readEnv('DB_USERNAME', 'aplis'),
    password: readEnv('DB_PASSWORD', ''),
  },
};
