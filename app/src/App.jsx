import { startTransition, useEffect, useMemo, useState } from 'react'

import AppShell from './app/AppShell'
import Sidebar from './components/Sidebar'
import MedicosPage from './features/medicos/MedicosPage'
import PacientesPage from './features/pacientes/PacientesPage'
import { getMessages } from './i18n'

const STORAGE_KEY = 'aplis.frontend.locale'

function getInitialLocale() {
  if (typeof window === 'undefined') {
    return 'pt-BR'
  }

  return window.localStorage.getItem(STORAGE_KEY) ?? 'pt-BR'
}

function App() {
  const [activeSection, setActiveSection] = useState('medicos')
  const [locale, setLocale] = useState(getInitialLocale)
  const messages = useMemo(() => getMessages(locale), [locale])

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, locale)
  }, [locale])

  function handleSectionChange(section) {
    startTransition(() => {
      setActiveSection(section)
    })
  }

  function handleLocaleChange(nextLocale) {
    startTransition(() => {
      setLocale(nextLocale)
    })
  }

  const sidebarItems = [
    {
      id: 'medicos',
      label: messages.sidebar.medicos.label,
      description: messages.sidebar.medicos.description,
    },
    {
      id: 'pacientes',
      label: messages.sidebar.pacientes.label,
      description: messages.sidebar.pacientes.description,
    },
  ]

  return (
    <AppShell
      sidebar={
        <Sidebar
          appName={messages.appName}
          appSubtitle={messages.appSubtitle}
          sectionsLabel={messages.sectionsLabel}
          localeLabel={messages.localeLabel}
          items={sidebarItems}
          activeItem={activeSection}
          onNavigate={handleSectionChange}
          locale={locale}
          localeOptions={messages.localeOptions}
          onLocaleChange={handleLocaleChange}
        />
      }
    >
      {activeSection === 'medicos' ? (
        <MedicosPage
          messages={messages.medicosPage}
          commonMessages={messages.common}
        />
      ) : (
        <PacientesPage
          messages={messages.pacientesPage}
          commonMessages={messages.common}
        />
      )}
    </AppShell>
  )
}

export default App
