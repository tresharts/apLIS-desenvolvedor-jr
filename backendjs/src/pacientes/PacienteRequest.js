class PacienteRequest {
  constructor({ nome, dataNascimento = null, carteirinha, cpf }) {
    this.nome = nome;
    this.dataNascimento = dataNascimento;
    this.carteirinha = carteirinha;
    this.cpf = cpf;
  }
}

module.exports = PacienteRequest;
