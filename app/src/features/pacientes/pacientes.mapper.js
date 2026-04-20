function mapPacienteFormToRequest(formData) {
  return {
    nome: formData.nome.trim(),
    dataNascimento: formData.dataNascimento || null,
    carteirinha: formData.carteirinha.trim(),
    cpf: formData.cpf.replace(/\D/g, ''),
  }
}

export { mapPacienteFormToRequest }
