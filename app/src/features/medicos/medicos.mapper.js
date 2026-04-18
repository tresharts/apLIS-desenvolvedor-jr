function mapMedicoFormToRequest(formData) {
  return {
    nome: formData.nome.trim(),
    CRM: formData.CRM.trim(),
    UFCRM: formData.UFCRM.trim().toUpperCase(),
  }
}

export { mapMedicoFormToRequest }
