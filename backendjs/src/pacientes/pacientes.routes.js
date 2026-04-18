const { Router } = require('express');

function createPacientesRouter(pacienteController) {
  const router = Router();

  router.get('/', pacienteController.listar);
  router.post('/', pacienteController.criar);

  return router;
}

module.exports = {
  createPacientesRouter,
};
