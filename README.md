# API de Tickets de Suporte

Uma API RESTful desenvolvida em Node.js puro com TypeScript para gerenciamento de tickets de suporte técnico. Este projeto foi criado para demonstrar a construção de uma aplicação back-end robusta sem o uso de frameworks, focando nos fundamentos do Node.js.

## 🚀 Sobre o Projeto

Esta API simula um sistema onde usuários podem criar, visualizar, atualizar e deletar tickets de suporte para equipamentos. Além disso, permite a busca por tickets específicos e o fechamento de um ticket com a adição de uma solução.

O principal objetivo foi construir uma aplicação do zero, implementando manualmente funcionalidades essenciais como roteamento e manipulação de banco de dados em arquivo, para aprofundar os conhecimentos na plataforma Node.js.

## ✨ Funcionalidades

*   **CRUD de Tickets:** Operações completas de Criar, Ler, Atualizar e Deletar tickets.
*   **Listagem com Filtros:** Capacidade de listar tickets aplicando filtros por qualquer um de seus atributos.
*   **Atualização de Status:** Endpoint específico para fechar um ticket, alterando seu status e adicionando uma solução.
*   **Roteamento Dinâmico:** Sistema de rotas customizado que suporta parâmetros na URL e query strings.
*   **Persistência de Dados:** Utiliza um arquivo `db.json` local como banco de dados, com uma classe que abstrai as operações de acesso aos dados.

## 🛠️ Tecnologias Utilizadas

*   Node.js
*   TypeScript

## ⚙️ Como Executar o Projeto

Para executar este projeto localmente, siga os passos abaixo:

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/tcolonhezi/support-tickets.git
    ```

2.  **Navegue até o diretório do projeto:**
    ```bash
    cd support-tickets
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

4.  **Inicie o servidor:**
    ```bash
    npm run dev
    ```

O servidor estará rodando em `http://localhost:3333`.

## Endpoints da API

A seguir estão os endpoints disponíveis na API:

#### `POST /tickets`

Cria um novo ticket de suporte.

**Corpo da Requisição:**

```json
{
  "user_name": "Nome do Usuário",
  "equipment": "Computador A",
  "description": "O computador não liga."
}
```

**Resposta de Sucesso (201):**

```json
{
  "ticket": {
    "id": "uuid-gerado",
    "user_name": "Nome do Usuário",
    "equipment": "Computador A",
    "description": "O computador não liga.",
    "status": "open",
    "created_at": "data-de-criacao",
    "updated_at": "data-de-atualizacao"
  },
  "message": "Ticket created successfully"
}
```

---

#### `GET /tickets`

Lista todos os tickets. É possível adicionar filtros via query string.

**Exemplo com filtro:** `GET /tickets?status=open&user_name=Nome`

**Resposta de Sucesso (200):**

```json
{
  "tickets": [
    {
      "id": "uuid-gerado",
      "user_name": "Nome do Usuário",
      "equipment": "Computador A",
      "description": "O computador não liga.",
      "status": "open",
      "created_at": "data-de-criacao",
      "updated_at": "data-de-atualizacao"
    }
  ]
}
```

---

#### `PUT /tickets/:id`

Atualiza as informações de um ticket específico.

**Corpo da Requisição:**

```json
{
  "equipment": "Computador B",
  "description": "A tela do computador está quebrada."
}
```

---

#### `PATCH /tickets/:id/close`

Fecha um ticket, alterando seu status para `closed` e adicionando uma solução.

**Corpo da Requisição:**

```json
{
  "solution": "O problema foi resolvido trocando a fonte de alimentação."
}
```

---

#### `DELETE /tickets/:id`

Deleta um ticket específico.

**Resposta de Sucesso (200):**

```json
{
  "message": "Ticket deleted successfully"
}
```