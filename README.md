# Movies App

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)

## Visão Geral
Este projeto é uma aplicação em React que consome a API do TMDB para permitir que usuários busquem filmes, vejam detalhes e montem uma lista de favoritos.  

A aplicação possui páginas de busca, detalhes do filme e favoritos, com persistência usando `localStorage`.  

## Funcionalidades

1. **Página de Busca**
   - Campo de texto para digitar o termo de pesquisa.
   - Exibição da lista de resultados com pôster, título, ano e botão para ver detalhes.

2. **Paginação**
   - Navegação entre páginas de resultados.

3. **Página de Detalhes**
   - Exibição completa de informações do filme: diretor, elenco, sinopse, avaliação.

4. **Lista de Favoritos**
   - Botão para adicionar/remover filmes da lista de favoritos.
   - Favoritos persistidos em `localStorage`.

5. **Tratamento de Erros & Loading**
   - Exibição de indicador enquanto aguarda a resposta da API.
   - Mensagens de erro quando necessário.

## Estrutura
- `src/components/FetchMovies.jsx`: Página de busca e exibição dos filmes.
- `src/components/MovieDetails.jsx`: Página de detalhes do filme.
- `src/components/FavoritesPage.jsx`: Página com os filmes favoritos.

## Configuração do Token
Para utilizar a API do TMDB, insira seu token no início dos arquivos `FetchMovies.jsx` e `MovieDetails.jsx`:

```js
const token = "TOKEN_AQUI";
```

## Como executar o projeto

### 1. Clonar o repositório

```bash
git clone <URL_DO_REPOSITORIO>
```

### 2. Acessar a pasta do projeto
```bash

cd <NOME_DA_PASTA>
```

### 3. Instalar as dependências
```bash

npm install
```

### 4. Iniciar o projeto em modo de desenvolvimento
```bash
npm run dev
```

### 5. Abrir no navegador
```bash
Acesse: http://localhost:5173
```

## 🧑‍💻 Contato

Desenvolvido por Bruno Vivian Carvalho.

[![Linkedin Badge](https://img.shields.io/badge/-Bruno-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/bvcarvalho/)](https://www.linkedin.com/in/bvcarvalho/)
