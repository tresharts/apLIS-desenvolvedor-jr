import { createApiClient } from '../../services/apiClient'

const nodeApiClient = createApiClient(
  import.meta.env.VITE_NODE_API_URL ?? 'http://localhost:3000'
)

function listPacientes() {
  return nodeApiClient.get('/api/v1/pacientes')
}

function createPaciente(payload) {
  return nodeApiClient.post('/api/v1/pacientes', payload)
}

export { createPaciente, listPacientes }
