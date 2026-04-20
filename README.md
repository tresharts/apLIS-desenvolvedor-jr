# Painel Clínico Fullstack

Aplicação fullstack para cadastro e listagem de médicos e pacientes, composta por:

- frontend SPA em React
- backend PHP para médicos
- backend Node.js para pacientes
- banco MySQL compartilhado

O projeto foi organizado em três partes independentes, com integração ponta a ponta entre as camadas.

## Objetivo

Entregar uma aplicação simples e funcional com:

- listagem e cadastro de médicos
- listagem e cadastro de pacientes
- menu lateral para navegação entre as seções
- integração entre frontend, dois backends e banco compartilhado

## Stack

- Frontend: React 19 + Vite
- Backend PHP: PHP 8.3 + PDO + MySQL
- Backend Node.js: Node.js + Express + mysql2
- Banco de dados: MySQL 8.4
- Infra local: Docker Compose para stack completa

## Estrutura do projeto

```text
.
├── app/          # frontend React
├── backendjs/    # backend Node.js de pacientes
├── backendphp/   # backend PHP de médicos
├── database/     # schema SQL compartilhado
└── docker-compose.yml
```

## O que foi implementado

### Obrigatório

- backend PHP com `GET /api/v1/medicos` e `POST /api/v1/medicos`
- backend Node.js com `GET /api/v1/pacientes` e `POST /api/v1/pacientes`
- frontend React com sidebar e telas separadas de médicos e pacientes
- formulário + listagem para as duas entidades
- integração ponta a ponta com MySQL compartilhado

### Diferenciais

- arquitetura em camadas nos dois backends
- validação de payload
- respostas JSON padronizadas
- tratamento centralizado de erros
- configuração por variáveis de ambiente
- Docker para MySQL e backend PHP
- documentação de execução

### Desafio extra

- CRUD completo implementado para médicos e pacientes
- frontend preparado para multilíngua com `pt-BR` e `en-US`

## Portas

- Frontend React: `5173`
- Backend PHP: `8000`
- Backend Node.js: `3000`
- MySQL: `3306`

## Pré-requisitos

- Docker e Docker Compose
- Node.js
- npm

## Como rodar localmente

### Opção 1. Rodar tudo com Docker

Na raiz do projeto:

```bash
cp .env.example .env
# preencha MYSQL_ROOT_PASSWORD e MYSQL_PASSWORD no arquivo .env
docker compose up -d --build
```

Isso sobe:

- MySQL com o schema inicial da pasta `database/`
- backend PHP em `http://localhost:8000`
- backend Node.js em `http://localhost:3000`
- frontend em `http://localhost:5173`

### Opção 2. Rodar em modo híbrido

Se preferir desenvolvimento local para Node.js e React, também funciona:

### 1. Subir MySQL e backend PHP

Na raiz do projeto:

```bash
cp .env.example .env
# preencha MYSQL_ROOT_PASSWORD e MYSQL_PASSWORD no arquivo .env
docker compose up -d mysql backend-php
```

### 2. Rodar o backend Node.js

```bash
cd backendjs
npm install
cp .env.example .env
# use o mesmo valor definido em MYSQL_PASSWORD na raiz do projeto
npm run dev
```

Backend disponível em:

```text
http://localhost:3000
```

### 3. Rodar o frontend React

Em outro terminal:

```bash
cd app
npm install
cp .env.example .env
npm run dev -- --host localhost --port 5173
```

Frontend disponível em:

```text
http://localhost:5173
```

Observação:

- o backend Node está configurado para aceitar o frontend em `http://localhost:5173`
- por isso, para o teste no navegador, prefira abrir `localhost` em vez de `127.0.0.1`

## Variáveis de ambiente

### `.env.example` na raiz

```env
MYSQL_ROOT_PASSWORD=
MYSQL_DATABASE=aplis_teste
MYSQL_USER=aplis
MYSQL_PASSWORD=
```

Antes de subir com Docker, copie para `.env` e preencha as senhas localmente.
Isso vale tanto para `docker compose up -d --build` quanto para `docker compose up -d mysql backend-php`.

### `backendphp/.env.example`

```env
APP_ENV=local
APP_DEBUG=false
CORS_ORIGIN=http://localhost:5173
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=aplis_teste
DB_USERNAME=aplis
DB_PASSWORD=
```

### `backendjs/.env.example`

```env
PORT=3000
CORS_ORIGIN=http://localhost:5173
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=aplis_teste
DB_USERNAME=aplis
DB_PASSWORD=
```

### `app/.env.example`

```env
VITE_PHP_API_URL=http://localhost:8000
VITE_NODE_API_URL=http://localhost:3000
```

## Banco de dados

O schema inicial está em `database/schema.sql`.

Tabelas:

- `medicos`
- `pacientes`

Restrições principais:

- `crm + uf_crm` único para médicos
- `cpf` único para pacientes
- `carteirinha` única para pacientes

## Endpoints implementados

### Médicos - backend PHP

- `GET /api/v1/medicos`
- `GET /api/v1/medicos/:id`
- `POST /api/v1/medicos`
- `PUT /api/v1/medicos/:id`
- `DELETE /api/v1/medicos/:id`

Exemplo de payload:

```json
{
  "nome": "João da Silva",
  "CRM": "123456",
  "UFCRM": "CE"
}
```

### Pacientes - backend Node.js

- `GET /api/v1/pacientes`
- `GET /api/v1/pacientes/:id`
- `POST /api/v1/pacientes`
- `PUT /api/v1/pacientes/:id`
- `DELETE /api/v1/pacientes/:id`

Exemplo de payload:

```json
{
  "nome": "João da Silva",
  "dataNascimento": "2026-01-01",
  "carteirinha": "123456",
  "cpf": "12345678909"
}
```

## Respostas e erros

Padrão usado:

- `200` para consultas, atualização e exclusão
- `201` para criação
- `400` para dados inválidos
- `404` para recurso não encontrado
- `409` para duplicidade
- `500` para erro interno inesperado

Exemplo de erro:

```json
{
  "message": "Dados inválidos",
  "errors": {
    "cpf": "CPF deve conter 11 dígitos"
  }
}
```

## Fluxo de teste manual

1. Abrir `http://localhost:5173`
2. Navegar entre `Médicos` e `Pacientes`
3. Cadastrar um novo médico
4. Cadastrar um novo paciente
5. Editar um médico e um paciente
6. Excluir um médico e um paciente
7. Confirmar atualização das tabelas e mensagens de feedback

## Decisões técnicas

- backend PHP agrupado por domínio `Medicos`
- backend Node.js agrupado por domínio `pacientes`
- frontend organizado por feature
- cliente HTTP centralizado no frontend
- sidebar simples sem `react-router-dom`, já que o teste tem apenas duas seções
- Docker disponível para a stack completa, com healthcheck no MySQL para garantir o startup do backend Node.js

## Limitações conhecidas

- o frontend já está preparado para multilíngua com `pt-BR` e `en-US`
- a troca de idioma no backend ainda não foi implementada por header ou configuração de locale
- os testes realizados foram manuais, via navegador e chamadas HTTP locais

## Comandos úteis

Reiniciar banco e aplicar schema do zero:

```bash
docker compose down -v
docker compose up -d --build
```

Parar os containers:

```bash
docker compose stop
```
