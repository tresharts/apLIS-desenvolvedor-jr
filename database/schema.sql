CREATE TABLE IF NOT EXISTS medicos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    crm VARCHAR(20) NOT NULL,
    uf_crm CHAR(2) NOT NULL,

    CONSTRAINT uk_medicos_crm_uf UNIQUE (crm, uf_crm)
)   ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS pacientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    data_nascimento DATE NULL,
    carteirinha VARCHAR(30) NOT NULL,
    cpf CHAR(11) NOT NULL,
    CONSTRAINT uk_pacientes_carteirinha UNIQUE (carteirinha),
    CONSTRAINT uk_pacientes_cpf UNIQUE (cpf)
)   ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;