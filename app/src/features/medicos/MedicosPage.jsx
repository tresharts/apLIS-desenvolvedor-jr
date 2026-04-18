import { useCallback, useEffect, useState } from 'react'

import DataTable from '../../components/DataTable'
import FeedbackMessage from '../../components/FeedbackMessage'
import FormField from '../../components/FormField'
import PageHeader from '../../components/PageHeader'
import { ApiClientError } from '../../services/apiClient'
import { createMedico, listMedicos } from './medicos.api'
import { mapMedicoFormToRequest } from './medicos.mapper'

const initialFormData = {
  nome: '',
  CRM: '',
  UFCRM: '',
}

function validateMedicoForm(formData, messages) {
  const errors = {}

  if (formData.nome.trim() === '') {
    errors.nome = messages.validation.nome
  }

  if (formData.CRM.trim() === '') {
    errors.CRM = messages.validation.CRM
  }

  const ufcrm = formData.UFCRM.trim()

  if (ufcrm === '') {
    errors.UFCRM = messages.validation.UFCRMRequired
  } else if (!/^[A-Za-z]{2}$/.test(ufcrm)) {
    errors.UFCRM = messages.validation.UFCRMLength
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

function MedicosPage({ messages, commonMessages }) {
  const [formData, setFormData] = useState(initialFormData)
  const [fieldErrors, setFieldErrors] = useState({})
  const [feedback, setFeedback] = useState(null)
  const [medicos, setMedicos] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  const loadMedicos = useCallback(async () => {
    setLoading(true)

    try {
      const data = await listMedicos()
      setMedicos(data)
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
    void loadMedicos()
  }, [loadMedicos])

  function handleChange(field) {
    return (event) => {
      const nextValue =
        field === 'UFCRM'
          ? event.target.value.toUpperCase()
          : event.target.value

      setFormData((current) => ({
        ...current,
        [field]: nextValue,
      }))
    }
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const errors = validateMedicoForm(formData, messages)

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
      await createMedico(mapMedicoFormToRequest(formData))
      setFormData(initialFormData)
      setFeedback({
        type: 'success',
        title: commonMessages.successTitle,
        message: messages.successMessage,
      })
      await loadMedicos()
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
    { key: 'CRM', label: messages.table.columns.CRM },
    { key: 'UFCRM', label: messages.table.columns.UFCRM },
  ]

  return (
    <section className="entity-page">
      <PageHeader
        eyebrow={messages.eyebrow}
        title={messages.title}
        description={messages.description}
        badge={`${medicos.length} ${commonMessages.listBadge}`}
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
              id="medico-nome"
              label={messages.form.nome}
              value={formData.nome}
              onChange={handleChange('nome')}
              placeholder={messages.form.nomePlaceholder}
              error={fieldErrors.nome}
            />

            <div className="entity-form__row">
              <FormField
                id="medico-crm"
                label={messages.form.crm}
                value={formData.CRM}
                onChange={handleChange('CRM')}
                placeholder={messages.form.crmPlaceholder}
                error={fieldErrors.CRM}
              />
              <FormField
                id="medico-ufcrm"
                label={messages.form.ufcrm}
                value={formData.UFCRM}
                onChange={handleChange('UFCRM')}
                placeholder={messages.form.ufcrmPlaceholder}
                error={fieldErrors.UFCRM}
                maxLength={2}
              />
            </div>

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
              onClick={() => void loadMedicos()}
              disabled={loading}
            >
              {commonMessages.refresh}
            </button>
          </div>

          <DataTable
            columns={columns}
            rows={medicos}
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

export default MedicosPage
