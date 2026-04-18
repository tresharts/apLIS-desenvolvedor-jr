const BusinessRuleError = require('../errors/BusinessRuleError');
const PacienteMapper = require('./PacienteMapper');
const PacienteRequestValidator = require('./PacienteRequestValidator');

class PacienteService {
  constructor(pacienteRepository) {
    this.pacienteRepository = pacienteRepository;
  }

  async listar() {
    const pacientes = await this.pacienteRepository.findAll();

    return pacientes.map((paciente) =>
      PacienteMapper.toResponse(paciente).toJSON()
    );
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
}

module.exports = PacienteService;
