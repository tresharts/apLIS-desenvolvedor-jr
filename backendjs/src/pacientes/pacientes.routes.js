const { Router } = require('express');

function createPacientesRouter(pacienteController) {
  const router = Router();

  router.get('/', pacienteController.listar);
  router.get('/:id', pacienteController.buscarPorId);
  router.post('/', pacienteController.criar);
  router.put('/:id', pacienteController.atualizar);
  router.delete('/:id', pacienteController.remover);

  return router;
}

module.exports = {
  createPacientesRouter,
};
