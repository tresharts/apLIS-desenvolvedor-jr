const enUS = {
  appName: 'Clinical Dashboard',
  appSubtitle:
    'A React SPA that consumes doctor records from PHP and patient records from Node.js.',
  sectionsLabel: 'Sections',
  localeLabel: 'Language',
  localeOptions: [
    { value: 'pt-BR', label: 'PT-BR' },
    { value: 'en-US', label: 'EN-US' },
  ],
  sidebar: {
    medicos: {
      label: 'Doctors',
      description: 'Registration and listing powered by the PHP backend.',
    },
    pacientes: {
      label: 'Patients',
      description: 'Registration and listing powered by the Node.js backend.',
    },
  },
  common: {
    formTitle: 'New record',
    listTitle: 'Records',
    save: 'Save record',
    saving: 'Saving...',
    refresh: 'Refresh list',
    loading: 'Loading data...',
    networkError: 'The application could not connect to the configured APIs.',
    unexpectedError: 'The operation could not be completed right now.',
    requestFailed: 'The API returned an error and the request was not completed.',
    successTitle: 'Operation completed',
    errorTitle: 'Something went wrong',
    emptyTitle: 'No records have been created yet',
    emptyDescription: 'Use the form to create the first record.',
    listBadge: 'active records',
  },
  medicosPage: {
    eyebrow: 'PHP Backend',
    title: 'Doctors',
    description:
      'Manage doctor records through the PHP API connected to the shared project MySQL database.',
    successMessage: 'Doctor created successfully.',
    form: {
      nome: 'Name',
      nomePlaceholder: 'Ex.: John Doe',
      crm: 'CRM',
      crmPlaceholder: 'Ex.: 123456',
      ufcrm: 'CRM State',
      ufcrmPlaceholder: 'Ex.: CE',
    },
    table: {
      columns: {
        nome: 'Name',
        CRM: 'CRM',
        UFCRM: 'State',
      },
    },
    validation: {
      nome: 'Name is required.',
      CRM: 'CRM is required.',
      UFCRMRequired: 'CRM state is required.',
      UFCRMLength: 'CRM state must contain 2 letters.',
    },
  },
  pacientesPage: {
    eyebrow: 'Node.js Backend',
    title: 'Patients',
    description:
      'Create and list patients through the Node.js API while sharing the same MySQL database.',
    successMessage: 'Patient created successfully.',
    form: {
      nome: 'Name',
      nomePlaceholder: 'Ex.: Mary Smith',
      dataNascimento: 'Birth date',
      carteirinha: 'Member card',
      carteirinhaPlaceholder: 'Ex.: 00012345',
      cpf: 'CPF',
      cpfPlaceholder: 'Numbers only',
    },
    table: {
      columns: {
        nome: 'Name',
        dataNascimento: 'Birth date',
        carteirinha: 'Member card',
        cpf: 'CPF',
      },
    },
    validation: {
      nome: 'Name is required.',
      carteirinha: 'Member card is required.',
      cpfRequired: 'CPF is required.',
      cpfLength: 'CPF must contain 11 digits.',
      dataNascimento: 'Birth date must use the YYYY-MM-DD format.',
    },
  },
}

export default enUS
