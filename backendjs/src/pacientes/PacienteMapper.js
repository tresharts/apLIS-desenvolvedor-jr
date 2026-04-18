const PacienteResponse = require('./PacienteResponse');

class PacienteMapper {
  static toResponse(row) {
    return new PacienteResponse({
      id: row.id,
      nome: row.nome,
      dataNascimento: row.data_nascimento,
      carteirinha: row.carteirinha,
      cpf: row.cpf,
    });
  }
}

module.exports = PacienteMapper;
