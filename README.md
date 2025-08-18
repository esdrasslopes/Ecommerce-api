# 🛍️ E-commerce API

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Fastify](https://img.shields.io/badge/Fastify-000000?style=for-the-badge&logo=fastify&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-6E941C?style=for-the-badge&logo=vitest&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

</div>

<p align="center">
  <img alt="Status" src="https://img.shields.io/badge/status-em--desenvolvimento-green">
</p>

<p align="center">
 <a href="#-sobre-o-projeto">Sobre</a> •
 <a href="#-funcionalidades">Funcionalidades</a> •
 <a href="#-tecnologias-utilizadas">Tecnologias</a> •
 <a href="#-começando">Começando</a> •
 <a href="#-executando-os-testes">Testes</a> •
 <a href="#-variáveis-de-ambiente">Variáveis de Ambiente</a> •
 <a href="#-licença">Licença</a>
</p>

---

## 📖 Sobre o Projeto

Esta é uma API RESTful robusta para um sistema de e-commerce, construída com foco em performance e escalabilidade. Ela utiliza um stack moderno com Fastify para o servidor web, Prisma como ORM para uma comunicação eficiente com o banco de dados PostgreSQL, e Zod para validação de esquemas, garantindo a integridade dos dados.

---

## 🎯 Funcionalidades

A API foi projetada para suportar as operações essenciais de um sistema de e-commerce.

- 🔐 **Autenticação de Usuários**

  - Cadastro de novos usuários com senha criptografada.
  - Autenticação via e-mail e senha, retornando um token JWT.
  - Busca de perfil do usuário autenticado.

- 📦 **Gerenciamento de Produtos**

  - Criação, listagem, atualização e exclusão de produtos.
  - Busca de produtos por ID.
  - Suporte para upload de imagens para os produtos.

- 🛒 **Gerenciamento de Pedidos**

  - Criação de novos pedidos.
  - Listagem do histórico de pedidos de um usuário.
  - Visualização dos detalhes de um pedido específico.

- 🗂️ **Gerenciamento de Categorias**
  - Criação, listagem, atualização e exclusão de categorias de produtos.

---

## ✨ Tecnologias Utilizadas

Este projeto foi construído utilizando as seguintes tecnologias:

- **[Node.js](https://nodejs.org/en/)**: Ambiente de execução JavaScript.
- **[TypeScript](https://www.typescriptlang.org/)**: Superset do JavaScript que adiciona tipagem estática.
- **[Fastify](https://www.fastify.io/)**: Framework web focado em alta performance.
- **[Prisma](https://www.prisma.io/)**: ORM de próxima geração para Node.js e TypeScript.
- **[PostgreSQL](https://www.postgresql.org/)**: Sistema de gerenciamento de banco de dados relacional.
- **[Zod](https://zod.dev/)**: Biblioteca de validação de esquemas com inferência de tipos.
- **[Vitest](https://vitest.dev/)**: Framework de testes unitários e de integração.
- **[Docker](https://www.docker.com/)**: Plataforma para desenvolvimento, envio e execução de aplicações em contêineres.
- **[TSX](https://github.com/esbuild-kit/tsx)**: Executor de TypeScript para Node.js com base no esbuild.

---

## 🚀 Começando

Para executar este projeto localmente, siga os passos abaixo.

### Pré-requisitos

Você vai precisar ter as seguintes ferramentas instaladas na sua máquina:

- [Node.js](https://nodejs.org/en/) (v18 ou superior)
- [NPM](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/products/docker-desktop/) e [Docker Compose](https://docs.docker.com/compose/install/)

### Instalação

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/esdrasslopes/Ecommerce-api.git
    cd Ecommerce-api
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    ```

3.  **Inicie o banco de dados com Docker:**
    O banco de dados PostgreSQL será executado em um contêiner Docker.

    ```bash
    docker-compose up -d
    ```

    Isso iniciará o banco na porta `5433` da sua máquina local.

4.  **Configure as variáveis de ambiente:**
    Copie o arquivo de exemplo `.env.example` e renomeie para `.env`.

    ```bash
    cp .env.example .env
    ```

    _As variáveis padrão já estão configuradas para se conectar ao banco de dados Docker._

5.  **Execute as migrações do Prisma:**
    Este comando irá criar as tabelas no seu banco de dados com base no schema do Prisma.
    ```bash
    npx prisma migrate dev
    ```

### Executando a Aplicação

Para iniciar o servidor em modo de desenvolvimento com hot-reload:

```bash
npm run start:dev
```

## 🧪 Executando os Testes

O projeto possui dois conjuntos de testes: testes de unidade/casos de uso e testes end-to-end (E2E).

1.  **Testes de Unidade/Casos de Uso:**

    ```bash
    npm test
    ```

2.  **Testes End-to-End (Controllers):**
    ```bash
    npm run test:e2e
    ```
