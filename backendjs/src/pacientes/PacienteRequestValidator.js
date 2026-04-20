const ValidationError = require('../errors/ValidationError');
const PacienteRequest = require('./PacienteRequest');

function isValidDateString(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const [year, month, day] = value.split('-').map(Number);
  const candidate = new Date(Date.UTC(year, month - 1, day));

  return (
    candidate.getUTCFullYear() === year &&
    candidate.getUTCMonth() === month - 1 &&
    candidate.getUTCDate() === day
  );
}

class PacienteRequestValidator {
  static validate(payload = {}) {
    const nome = String(payload.nome ?? '').trim();
    const dataNascimento = String(payload.dataNascimento ?? '').trim();
    const carteirinha = String(payload.carteirinha ?? '').trim();
    const cpf = String(payload.cpf ?? '').replace(/\D/g, '');

    const errors = {};

    if (nome === '') {
      errors.nome = 'Nome é obrigatório';
    }

    if (carteirinha === '') {
      errors.carteirinha = 'Carteirinha é obrigatória';
    }

    if (cpf === '') {
      errors.cpf = 'CPF é obrigatório';
    } else if (!/^\d{11}$/.test(cpf)) {
      errors.cpf = 'CPF deve conter 11 dígitos';
    }

    if (dataNascimento !== '' && !isValidDateString(dataNascimento)) {
      errors.dataNascimento = 'Data de nascimento deve estar no formato YYYY-MM-DD';
    }

    if (Object.keys(errors).length > 0) {
      throw new ValidationError('Dados inválidos', errors);
    }

    return new PacienteRequest({
      nome,
      dataNascimento: dataNascimento === '' ? null : dataNascimento,
      carteirinha,
      cpf,
    });
  }
}

module.exports = PacienteRequestValidator;
