import { createApiClient } from '../../services/apiClient'

const phpApiClient = createApiClient(
  import.meta.env.VITE_PHP_API_URL ?? 'http://localhost:8000'
)

function listMedicos() {
  return phpApiClient.get('/api/v1/medicos')
}

function createMedico(payload) {
  return phpApiClient.post('/api/v1/medicos', payload)
}

function updateMedico(id, payload) {
  return phpApiClient.put(`/api/v1/medicos/${id}`, payload)
}

function deleteMedico(id) {
  return phpApiClient.delete(`/api/v1/medicos/${id}`)
}

export { createMedico, deleteMedico, listMedicos, updateMedico }
