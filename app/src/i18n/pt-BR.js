const ptBR = {
  appName: 'Painel Clínico',
  appSubtitle:
    'Uma SPA em React consumindo os cadastros de médicos em PHP e pacientes em Node.js.',
  sectionsLabel: 'Seções',
  localeLabel: 'Idioma',
  localeOptions: [
    { value: 'pt-BR', label: 'PT-BR' },
    { value: 'en-US', label: 'EN-US' },
  ],
  sidebar: {
    medicos: {
      label: 'Médicos',
      description: 'Cadastro e listagem pelo backend PHP.',
    },
    pacientes: {
      label: 'Pacientes',
      description: 'Cadastro e listagem pelo backend Node.js.',
    },
  },
  common: {
    formTitle: 'Novo cadastro',
    listTitle: 'Registros',
    save: 'Salvar cadastro',
    saving: 'Salvando...',
    refresh: 'Atualizar lista',
    loading: 'Carregando dados...',
    networkError: 'Não foi possível conectar com as APIs configuradas.',
    unexpectedError: 'Não foi possível concluir a operação agora.',
    requestFailed: 'A API respondeu com um erro e o cadastro não foi concluído.',
    successTitle: 'Operação concluída',
    errorTitle: 'Algo saiu do esperado',
    emptyTitle: 'Nenhum registro cadastrado ainda',
    emptyDescription: 'Use o formulário para incluir o primeiro registro.',
    listBadge: 'registros ativos',
  },
  medicosPage: {
    eyebrow: 'Backend PHP',
    title: 'Médicos',
    description:
      'Gerencie o cadastro de médicos usando a API em PHP conectada ao mesmo MySQL do projeto.',
    successMessage: 'Médico criado com sucesso.',
    form: {
      nome: 'Nome',
      nomePlaceholder: 'Ex.: João da Silva',
      crm: 'CRM',
      crmPlaceholder: 'Ex.: 123456',
      ufcrm: 'UF do CRM',
      ufcrmPlaceholder: 'Ex.: CE',
    },
    table: {
      columns: {
        nome: 'Nome',
        CRM: 'CRM',
        UFCRM: 'UFCRM',
      },
    },
    validation: {
      nome: 'Nome é obrigatório.',
      CRM: 'CRM é obrigatório.',
      UFCRMRequired: 'UFCRM é obrigatório.',
      UFCRMLength: 'UFCRM deve ter 2 letras.',
    },
  },
  pacientesPage: {
    eyebrow: 'Backend Node.js',
    title: 'Pacientes',
    description:
      'Cadastre e acompanhe pacientes pela API em Node.js, compartilhando a mesma base MySQL.',
    successMessage: 'Paciente criado com sucesso.',
    form: {
      nome: 'Nome',
      nomePlaceholder: 'Ex.: Maria de Souza',
      dataNascimento: 'Data de nascimento',
      carteirinha: 'Carteirinha',
      carteirinhaPlaceholder: 'Ex.: 00012345',
      cpf: 'CPF',
      cpfPlaceholder: 'Somente números',
    },
    table: {
      columns: {
        nome: 'Nome',
        dataNascimento: 'Data de nascimento',
        carteirinha: 'Carteirinha',
        cpf: 'CPF',
      },
    },
    validation: {
      nome: 'Nome é obrigatório.',
      carteirinha: 'Carteirinha é obrigatória.',
      cpfRequired: 'CPF é obrigatório.',
      cpfLength: 'CPF deve conter 11 dígitos.',
      dataNascimento: 'Data de nascimento deve estar no formato YYYY-MM-DD.',
    },
  },
}

export default ptBR
