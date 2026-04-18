class PacienteRepository {
  constructor(pool) {
    this.pool = pool;
  }

  async findAll() {
    const [rows] = await this.pool.execute(
      `
        SELECT
          id,
          nome,
          DATE_FORMAT(data_nascimento, '%Y-%m-%d') AS data_nascimento,
          carteirinha,
          cpf
        FROM pacientes
        ORDER BY id ASC
      `
    );

    return rows;
  }

  async findByCpfOrCarteirinha(cpf, carteirinha) {
    const [rows] = await this.pool.execute(
      `
        SELECT id, cpf, carteirinha
        FROM pacientes
        WHERE cpf = ? OR carteirinha = ?
        LIMIT 1
      `,
      [cpf, carteirinha]
    );

    return rows[0] ?? null;
  }

  async create(pacienteRequest) {
    const [result] = await this.pool.execute(
      `
        INSERT INTO pacientes (nome, data_nascimento, carteirinha, cpf)
        VALUES (?, ?, ?, ?)
      `,
      [
        pacienteRequest.nome,
        pacienteRequest.dataNascimento,
        pacienteRequest.carteirinha,
        pacienteRequest.cpf,
      ]
    );

    return result.insertId;
  }
}

module.exports = PacienteRepository;
