const express = require('express');
const cors = require('cors');

const { buildCorsOptions } = require('./config/cors');
const NotFoundError = require('./errors/NotFoundError');
const { errorHandler } = require('./http/errorHandler');
const { createPacientesRouter } = require('./pacientes/pacientes.routes');

function createApp({ appConfig, pacienteController }) {
  const app = express();

  app.use(cors(buildCorsOptions(appConfig)));
  app.use(express.json());

  app.get('/health', (request, response) => {
    return response.status(200).json({
      message: 'Backend Node em execução',
    });
  });

  app.use('/api/v1/pacientes', createPacientesRouter(pacienteController));

  app.use((request, response, next) => {
    next(new NotFoundError());
  });

  app.use(errorHandler);

  return app;
}

module.exports = {
  createApp,
};
