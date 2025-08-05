# Documentação do Projeto: Produtos (Backend e Frontend)

![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
<img width="1917" height="1080" alt="Screenshot from 2025-07-16 09-54-57" src="https://github.com/user-attachments/assets/607a879c-c552-47f2-8cad-df7cd7804d3a" />

Este repositório contém os códigos-fonte do projeto de Produtos, que inclui um backend (API RESTful em NestJS) e um frontend (aplicação web em Angular Universal/SSR). Ambos os serviços são orquestrados usando Docker Compose para facilitar o desenvolvimento e a implantação.

## Sumário

- [Visão Geral](#1-visão-geral)
- [Pré-requisitos](#2-pré-requisitos)
- [Estrutura do Projeto](#3-estrutura-do-projeto)
- [Configuração do Ambiente](#4-configuração-do-ambiente)
- [Como Rodar a Aplicação](#5-como-rodar-a-aplicação)
- [Acessando a Aplicação](#6-acessando-a-aplicação)
- [Considerações Importantes](#8-considerações-importantes)

## 1. Visão Geral

![Arquitetura](https://img.shields.io/badge/Arquitetura-Docker_Compose-blueviolet?style=flat)

Este projeto é composto por:

- **api-products (Backend)**: 
  ![NestJS](https://img.shields.io/badge/-NestJS-E0234E?style=flat&logo=nestjs&logoColor=white) API RESTful que gerencia dados de produtos
  ![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-4169E1?style=flat&logo=postgresql&logoColor=white) Banco de dados relacional

- **front-products (Frontend)**:
  ![Angular](https://img.shields.io/badge/-Angular-DD0031?style=flat&logo=angular&logoColor=white) Aplicação web com SSR
  ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat&logo=typescript&logoColor=white) Linguagem principal

## 2. Pré-requisitos

![Docker](https://img.shields.io/badge/Requisitos-Docker-2496ED?style=flat)

- Docker Desktop (inclui Docker Engine e Docker Compose)
  - [Instalação para Windows](https://docs.docker.com/desktop/install/windows-install/)
  - [Instalação para macOS](https://docs.docker.com/desktop/install/mac-install/)
  - [Instalação para Linux](https://docs.docker.com/desktop/install/linux-install/)

## 3. Estrutura do Projeto

```text
.
├── api-products/
│   ├── src/                     # Código fonte da API NestJS
│   ├── Dockerfile               # Dockerfile para a API
│   └── .env                     # Variáveis de ambiente
├── front-products/
│   ├── src/                     # Código fonte do Frontend Angular
│   ├── Dockerfile               # Dockerfile para o Frontend
│   └── ...
├── docker/
│   ├── api-products/
│   │   └── Dockerfile           # Dockerfile para o backend
│   ├── front-products/
│   │   └── Dockerfile           # Dockerfile para o frontend
│   └── postgres/
│       └── init.sql             # Script SQL de inicialização
└── docker-compose.yml           # Arquivo de orquestração
```

## 4. Configuração do Ambiente
4.1. Variáveis de Ambiente</br>
Backend (api-products/.env)</br>

env
```text
DB_HOST=postgres_db
DB_PORT=5432
DB_USER=docker_user
DB_PASSWORD=docker_password
DB_NAME=product_db
```
## 5. Como Rodar a Aplicação
5.1. Iniciando com Docker Compose</br>
```bash
docker compose up --build -d --force-recreate
```
![Docker](https://img.shields.io/badge/Requisitos-Docker-2496ED?style=flat)

Parâmetro	Descrição</br>
--build	Constrói imagens a partir dos Dockerfiles</br>
-d	Executa em modo detached (segundo plano)</br>
--force-recreate	Recria os containers mesmo sem mudanças</br>

5.2. Parando a Aplicação
```bash
docker compose down -v
```
5.3. Reconstruindo Imagens
```bash
docker compose build
docker compose up -d --force-recreate
```
Ou rode
```bash
docker compose down -v && docker compose up -d --force-recreate
```

## 6. Acessando a Aplicação
Serviço	URL</br>
API Backend	http://localhost:3000</br>
Frontend	http://localhost:4000</br>
Health Check	http://localhost:3000/health</br>

## 7. Considerações Importantes
Healthchecks configurados para evitar race conditions</br>
Volume postgres_data persiste dados do PostgreSQL</br>
Rede Docker app_network permite comunicação entre serviços</br>
Existem algumas imagens dentro de IonZ-Teste/front-products/assets para teste.</br>
Existe o arquivo products.txt com alguns produtos e insomnia em /home/dev/Documents/teste/IonZ-Teste/api-products/docs </br>

# 🔥 Fullstack CRUD com NestJS + Angular SSR + Docker
**Desenvolvido como teste técnico para [Nome da Empresa] - Passei, mas a vaga "evaporou".**  
Aqui está tudo o que eles pediram (e mais um pouco), agora aberto à comunidade.

⚠️ **Aviso Legal:** Código sob licença MIT. Proibido uso comercial por Aionz sem autorização por escrito.
