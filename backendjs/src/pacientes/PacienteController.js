class PacienteController {
  constructor(pacienteService) {
    this.pacienteService = pacienteService;
    this.listar = this.listar.bind(this);
    this.criar = this.criar.bind(this);
  }

  async listar(request, response, next) {
    try {
      const pacientes = await this.pacienteService.listar();
      return response.status(200).json(pacientes);
    } catch (error) {
      return next(error);
    }
  }

  async criar(request, response, next) {
    try {
      await this.pacienteService.criar(request.body);

      return response.status(201).json({
        message: 'Paciente criado com sucesso',
      });
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = PacienteController;
