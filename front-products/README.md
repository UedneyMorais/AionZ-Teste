# Sistema de Produtos (Frontend Angular com SSR)

<p align="center">
  <img src="https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white" alt="Angular Badge"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript Badge"/>
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js Badge"/>
  <img src="https://img.shields.io/badge/NPM-CB3837?style=for-the-badge&logo=npm&logoColor=white" alt="NPM Badge"/>
</p>

Este projeto foi gerado com [Angular CLI](https://github.com/angular/angular-cli) versão 18.2.20.

---

## Descrição do Projeto

Este é o módulo **Front-end** do sistema de produtos, desenvolvido com **Angular e Server-Side Rendering (SSR)**, também conhecido como Angular Universal. Ele se conecta à API do backend para exibir e gerenciar produtos, focando em uma experiência de usuário otimizada e melhor performance de SEO.

As principais funcionalidades e características implementadas são:

* **Listagem de Produtos:** Exibe uma listagem completa dos produtos obtidos da API, mostrando para cada item o **nome, descrição, preço e imagem**.
* **Página de Detalhes do Produto:** Ao acessar uma rota específica de produto (ex: `/produto/mouse-gamer`), exibe os detalhes completos do item.
* **Exibição da URL Atual:** Na página de detalhes do produto, a URL atual é exibida utilizando `window.location.href`.
* **Angular Universal (SSR):** Configuração correta de `@angular/platform-server` para habilitar o Server-Side Rendering, garantindo que o conteúdo seja renderizado no servidor antes de ser enviado ao cliente.
* **Componente Reutilizável:** Utilização de um componente Angular reutilizável para a exibição padronizada dos produtos.
* **Lazy Loading:** Implementação de lazy loading nas rotas para otimizar o carregamento da aplicação, carregando módulos apenas quando são necessários.
* **SEO Básico:** Configuração de meta tags dinâmicas para um SEO básico, melhorando a visibilidade do conteúdo nos motores de busca.

## Servidor de Desenvolvimento

Para iniciar o servidor de desenvolvimento:

```bash
ng serve
```

Navegue para http://localhost:4200/. A aplicação será recarregada automaticamente se você alterar qualquer um dos arquivos fonte.

Code Scaffolding
Para gerar novos componentes, diretivas, serviços, etc.:

```bash
ng generate component component-name
```

Você também pode usar:

```bash
ng generate directive|pipe|service|class|guard|interface|enum|module
```

Build (Compilação)</br>
Para compilar o projeto para produção, incluindo o Server-Side Rendering:</br>

```bash
ng build --configuration production --ssr
```
Os artefatos de build serão armazenados no diretório dist/.</br>

Executando o Servidor SSR</br>
Após compilar o projeto com SSR, para iniciar o servidor Node.js que irá servir a aplicação Angular com Universal:</br>

```bash
npm run serve:ssr
```
A aplicação estará acessível em http://localhost:4000/.</br>

Executando Testes de Unidade</br>
Para executar os testes de unidade via Karma:</br>

```bash
ng test
```

Executando Testes End-to-End (E2E)
Para executar os testes end-to-end:

```bash
ng e2e
```
---
## Observações:
Algumas imagens para uso em assets
---
