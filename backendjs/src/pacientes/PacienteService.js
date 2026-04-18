const BusinessRuleError = require('../errors/BusinessRuleError');
const NotFoundError = require('../errors/NotFoundError');
const PacienteMapper = require('./PacienteMapper');
const PacienteRequestValidator = require('./PacienteRequestValidator');

class PacienteService {
  constructor(pacienteRepository) {
    this.pacienteRepository = pacienteRepository;
  }

  async listar() {
    const pacientes = await this.pacienteRepository.findAll();

    return pacientes.map((paciente) => this.toResponse(paciente));
  }

  async buscarPorId(id) {
    const paciente = await this.findPacienteOrFail(id);

    return this.toResponse(paciente);
  }

  async criar(payload) {
    const pacienteRequest = PacienteRequestValidator.validate(payload);
    const existingPaciente = await this.pacienteRepository.findByCpfOrCarteirinha(
      pacienteRequest.cpf,
      pacienteRequest.carteirinha
    );

    if (existingPaciente) {
      const duplicatedField =
        existingPaciente.cpf === pacienteRequest.cpf ? 'cpf' : 'carteirinha';

      throw new BusinessRuleError('Paciente já cadastrado', {
        [duplicatedField]:
          duplicatedField === 'cpf'
            ? 'Já existe um paciente com este CPF'
            : 'Já existe um paciente com esta carteirinha',
      });
    }

    try {
      await this.pacienteRepository.create(pacienteRequest);
    } catch (error) {
      if (error && error.code === 'ER_DUP_ENTRY') {
        throw new BusinessRuleError('Paciente já cadastrado');
      }

      throw error;
    }
  }

  async atualizar(id, payload) {
    await this.findPacienteOrFail(id);

    const pacienteRequest = PacienteRequestValidator.validate(payload);
    const existingPaciente =
      await this.pacienteRepository.findByCpfOrCarteirinhaExcludingId(
        pacienteRequest.cpf,
        pacienteRequest.carteirinha,
        id
      );

    if (existingPaciente) {
      const duplicatedField =
        existingPaciente.cpf === pacienteRequest.cpf ? 'cpf' : 'carteirinha';

      throw new BusinessRuleError('Paciente já cadastrado', {
        [duplicatedField]:
          duplicatedField === 'cpf'
            ? 'Já existe um paciente com este CPF'
            : 'Já existe um paciente com esta carteirinha',
      });
    }

    try {
      await this.pacienteRepository.update(id, pacienteRequest);
    } catch (error) {
      if (error && error.code === 'ER_DUP_ENTRY') {
        throw new BusinessRuleError('Paciente já cadastrado');
      }

      throw error;
    }
  }

  async remover(id) {
    await this.findPacienteOrFail(id);
    await this.pacienteRepository.delete(id);
  }

  async findPacienteOrFail(id) {
    const paciente = await this.pacienteRepository.findById(id);

    if (!paciente) {
      throw new NotFoundError('Paciente não encontrado');
    }

    return paciente;
  }

  toResponse(paciente) {
    return PacienteMapper.toResponse(paciente).toJSON();
  }
}

module.exports = PacienteService;
