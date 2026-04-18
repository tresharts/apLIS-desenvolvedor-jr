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

export { createMedico, listMedicos }
