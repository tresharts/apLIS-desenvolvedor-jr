const env = require('./config/env');
const { createDatabasePool } = require('./config/db');
const { createApp } = require('./app');
const PacienteController = require('./pacientes/PacienteController');
const PacienteRepository = require('./pacientes/PacienteRepository');
const PacienteService = require('./pacientes/PacienteService');

async function startServer() {
  const pool = createDatabasePool(env.database);
  await pool.query('SELECT 1');

  const pacienteRepository = new PacienteRepository(pool);
  const pacienteService = new PacienteService(pacienteRepository);
  const pacienteController = new PacienteController(pacienteService);

  const app = createApp({
    appConfig: env.app,
    pacienteController,
  });

  const server = app.listen(env.app.port, () => {
    console.log(`[backendjs] servidor iniciado na porta ${env.app.port}`);
  });

  const shutdown = async (signal) => {
    console.log(`[backendjs] encerrando servidor (${signal})`);

    await new Promise((resolve, reject) => {
      server.close((error) => {
        if (error) {
          reject(error);
          return;
        }

        resolve();
      });
    });

    await pool.end();
    process.exit(0);
  };

  process.on('SIGINT', () => {
    void shutdown('SIGINT');
  });

  process.on('SIGTERM', () => {
    void shutdown('SIGTERM');
  });
}

startServer().catch((error) => {
  console.error('[backendjs] falha ao iniciar a aplicação', error.message);
  process.exit(1);
});
