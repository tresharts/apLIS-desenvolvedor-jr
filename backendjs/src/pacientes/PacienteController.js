const ValidationError = require('../errors/ValidationError');

class PacienteController {
  constructor(pacienteService) {
    this.pacienteService = pacienteService;
    this.listar = this.listar.bind(this);
    this.buscarPorId = this.buscarPorId.bind(this);
    this.criar = this.criar.bind(this);
    this.atualizar = this.atualizar.bind(this);
    this.remover = this.remover.bind(this);
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

  async buscarPorId(request, response, next) {
    try {
      const paciente = await this.pacienteService.buscarPorId(
        this.parseId(request.params.id)
      );

      return response.status(200).json(paciente);
    } catch (error) {
      return next(error);
    }
  }

  async atualizar(request, response, next) {
    try {
      await this.pacienteService.atualizar(
        this.parseId(request.params.id),
        request.body
      );

      return response.status(200).json({
        message: 'Paciente atualizado com sucesso',
      });
    } catch (error) {
      return next(error);
    }
  }

  async remover(request, response, next) {
    try {
      await this.pacienteService.remover(this.parseId(request.params.id));

      return response.status(200).json({
        message: 'Paciente removido com sucesso',
      });
    } catch (error) {
      return next(error);
    }
  }

  parseId(rawId) {
    if (!/^[1-9]\d*$/.test(String(rawId ?? ''))) {
      throw new ValidationError('Dados inválidos', {
        id: 'Id inválido',
      });
    }

    return Number(rawId);
  }
}

module.exports = PacienteController;
