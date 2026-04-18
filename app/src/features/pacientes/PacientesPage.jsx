import { useCallback, useEffect, useState } from 'react'

import DataTable from '../../components/DataTable'
import FeedbackMessage from '../../components/FeedbackMessage'
import FormField from '../../components/FormField'
import PageHeader from '../../components/PageHeader'
import { ApiClientError } from '../../services/apiClient'
import { createPaciente, listPacientes } from './pacientes.api'
import { mapPacienteFormToRequest } from './pacientes.mapper'

const initialFormData = {
  nome: '',
  dataNascimento: '',
  carteirinha: '',
  cpf: '',
}

function isValidDateString(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false
  }

  const [year, month, day] = value.split('-').map(Number)
  const candidate = new Date(Date.UTC(year, month - 1, day))

  return (
    candidate.getUTCFullYear() === year &&
    candidate.getUTCMonth() === month - 1 &&
    candidate.getUTCDate() === day
  )
}

function validatePacienteForm(formData, messages) {
  const errors = {}
  const sanitizedCpf = formData.cpf.replace(/\D/g, '')

  if (formData.nome.trim() === '') {
    errors.nome = messages.validation.nome
  }

  if (formData.carteirinha.trim() === '') {
    errors.carteirinha = messages.validation.carteirinha
  }

  if (sanitizedCpf === '') {
    errors.cpf = messages.validation.cpfRequired
  } else if (!/^\d{11}$/.test(sanitizedCpf)) {
    errors.cpf = messages.validation.cpfLength
  }

  if (
    formData.dataNascimento.trim() !== '' &&
    !isValidDateString(formData.dataNascimento.trim())
  ) {
    errors.dataNascimento = messages.validation.dataNascimento
  }

  return errors
}

function resolveFeedbackMessage(error, commonMessages) {
  if (error instanceof ApiClientError) {
    if (error.code === 'network_error') {
      return commonMessages.networkError
    }

    if (error.message === 'request_failed') {
      return commonMessages.requestFailed
    }

    return error.message
  }

  return commonMessages.unexpectedError
}

function PacientesPage({ messages, commonMessages }) {
  const [formData, setFormData] = useState(initialFormData)
  const [fieldErrors, setFieldErrors] = useState({})
  const [feedback, setFeedback] = useState(null)
  const [pacientes, setPacientes] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  const loadPacientes = useCallback(async () => {
    setLoading(true)

    try {
      const data = await listPacientes()
      setPacientes(data)
    } catch (error) {
      setFeedback({
        type: 'error',
        title: commonMessages.errorTitle,
        message: resolveFeedbackMessage(error, commonMessages),
      })
    } finally {
      setLoading(false)
    }
  }, [commonMessages])

  useEffect(() => {
    void loadPacientes()
  }, [loadPacientes])

  function handleChange(field) {
    return (event) => {
      const nextValue =
        field === 'cpf'
          ? event.target.value.replace(/[^\d]/g, '')
          : event.target.value

      setFormData((current) => ({
        ...current,
        [field]: nextValue,
      }))
    }
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const errors = validatePacienteForm(formData, messages)

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      setFeedback({
        type: 'error',
        title: commonMessages.errorTitle,
        message: commonMessages.requestFailed,
      })
      return
    }

    setSubmitting(true)
    setFieldErrors({})

    try {
      await createPaciente(mapPacienteFormToRequest(formData))
      setFormData(initialFormData)
      setFeedback({
        type: 'success',
        title: commonMessages.successTitle,
        message: messages.successMessage,
      })
      await loadPacientes()
    } catch (error) {
      setFieldErrors(error.details ?? {})
      setFeedback({
        type: 'error',
        title: commonMessages.errorTitle,
        message: resolveFeedbackMessage(error, commonMessages),
      })
    } finally {
      setSubmitting(false)
    }
  }

  const columns = [
    { key: 'nome', label: messages.table.columns.nome },
    {
      key: 'dataNascimento',
      label: messages.table.columns.dataNascimento,
      render: (row) => row.dataNascimento ?? '—',
    },
    { key: 'carteirinha', label: messages.table.columns.carteirinha },
    { key: 'cpf', label: messages.table.columns.cpf },
  ]

  return (
    <section className="entity-page">
      <PageHeader
        eyebrow={messages.eyebrow}
        title={messages.title}
        description={messages.description}
        badge={`${pacientes.length} ${commonMessages.listBadge}`}
      />

      <div className="entity-grid">
        <section className="panel panel--form">
          <div className="panel__heading">
            <h3>{commonMessages.formTitle}</h3>
          </div>

          <FeedbackMessage
            type={feedback?.type}
            title={feedback?.title}
            message={feedback?.message}
          />

          <form className="entity-form" onSubmit={handleSubmit}>
            <FormField
              id="paciente-nome"
              label={messages.form.nome}
              value={formData.nome}
              onChange={handleChange('nome')}
              placeholder={messages.form.nomePlaceholder}
              error={fieldErrors.nome}
            />

            <div className="entity-form__row">
              <FormField
                id="paciente-data-nascimento"
                label={messages.form.dataNascimento}
                value={formData.dataNascimento}
                onChange={handleChange('dataNascimento')}
                error={fieldErrors.dataNascimento}
                type="date"
              />
              <FormField
                id="paciente-carteirinha"
                label={messages.form.carteirinha}
                value={formData.carteirinha}
                onChange={handleChange('carteirinha')}
                placeholder={messages.form.carteirinhaPlaceholder}
                error={fieldErrors.carteirinha}
              />
            </div>

            <FormField
              id="paciente-cpf"
              label={messages.form.cpf}
              value={formData.cpf}
              onChange={handleChange('cpf')}
              placeholder={messages.form.cpfPlaceholder}
              error={fieldErrors.cpf}
              maxLength={11}
              inputMode="numeric"
            />

            <button className="primary-button" type="submit" disabled={submitting}>
              {submitting ? commonMessages.saving : commonMessages.save}
            </button>
          </form>
        </section>

        <section className="panel panel--table">
          <div className="panel__heading">
            <h3>{commonMessages.listTitle}</h3>
            <button
              type="button"
              className="secondary-button"
              onClick={() => void loadPacientes()}
              disabled={loading}
            >
              {commonMessages.refresh}
            </button>
          </div>

          <DataTable
            columns={columns}
            rows={pacientes}
            loading={loading}
            loadingLabel={commonMessages.loading}
            emptyState={{
              title: commonMessages.emptyTitle,
              description: commonMessages.emptyDescription,
            }}
          />
        </section>
      </div>
    </section>
  )
}

export default PacientesPage
