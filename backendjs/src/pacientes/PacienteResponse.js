class PacienteResponse {
  constructor({ id, nome, dataNascimento, carteirinha, cpf }) {
    this.id = id;
    this.nome = nome;
    this.dataNascimento = dataNascimento ?? undefined;
    this.carteirinha = carteirinha;
    this.cpf = cpf;
  }

  toJSON() {
    return {
      id: this.id,
      nome: this.nome,
      dataNascimento: this.dataNascimento,
      carteirinha: this.carteirinha,
      cpf: this.cpf,
    };
  }
}

module.exports = PacienteResponse;
