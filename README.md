Documentação do Projeto: Produtos (Backend e Frontend)
Este repositório contém os códigos-fonte do projeto de Produtos, que inclui um backend (API RESTful em NestJS) e um frontend (aplicação web em Angular Universal/SSR). Ambos os serviços são orquestrados usando Docker Compose para facilitar o desenvolvimento e a implantação.

Sumário
Visão Geral
Pré-requisitos
Estrutura do Projeto
Configuração do Ambiente
Variáveis de Ambiente
Como Rodar a Aplicação
Iniciando com Docker Compose
Parando a Aplicação
Reconstruindo Imagens
Acessando a Aplicação
Desenvolvimento (Para Contribuidores)
Backend (API Products)
Frontend (Front Products)
Considerações Importantes
1. Visão Geral
Este projeto é composto por:

api-products (Backend): Uma API RESTful desenvolvida com NestJS (Node.js) que gerencia os dados dos produtos. Ela se conecta a um banco de dados PostgreSQL.
front-products (Frontend): Uma aplicação web desenvolvida com Angular Universal (SSR - Server-Side Rendering) que consome a API do backend para exibir e interagir com os produtos.
docker: Contém os Dockerfiles e scripts de inicialização específicos para cada serviço e para o banco de dados.
docker-compose.yml: O arquivo principal para orquestrar e gerenciar todos os serviços (PostgreSQL, API e Frontend) com Docker Compose.
2. Pré-requisitos
Para rodar esta aplicação, você precisará ter o seguinte software instalado em sua máquina:

Docker Desktop (inclui Docker Engine e Docker Compose)
Instalação para Windows
Instalação para macOS
Instalação para Linux
3. Estrutura do Projeto
.
├── api-products/
│   ├── src/                     # Código fonte da API NestJS
│   ├── Dockerfile               # Dockerfile para a API (dentro de docker/)
│   └── .env                     # Variáveis de ambiente da API (montado via volume)
├── front-products/
│   ├── src/                     # Código fonte do Frontend Angular
│   ├── Dockerfile               # Dockerfile para o Frontend (dentro de docker/)
│   └── ...
├── docker/
│   ├── api-products/
│   │   └── Dockerfile           # Dockerfile para o backend (api_products)
│   ├── front-products/
│   │   └── Dockerfile           # Dockerfile para o frontend (front_products)
│   └── postgres/
│       └── init.sql             # Script SQL de inicialização do banco de dados
└── docker-compose.yml           # Arquivo de orquestração Docker Compose
4. Configuração do Ambiente
4.1. Variáveis de Ambiente
As variáveis de ambiente são carregadas automaticamente pelo Docker Compose ou especificadas nos arquivos .env.

No docker-compose.yml e docker/postgres/init.sql:

POSTGRES_DB: Nome do banco de dados PostgreSQL (padrão: product_db)
POSTGRES_USER: Usuário do banco de dados PostgreSQL (padrão: docker_user)
POSTGRES_PASSWORD: Senha do banco de dados PostgreSQL (padrão: docker_password)
No arquivo ./api-products/.env:

Este arquivo será montado como volume no contêiner da API. Crie-o na raiz do diretório api-products com o seguinte conteúdo:

Snippet de código

DB_HOST=postgres_db
DB_PORT=5432
DB_USER=docker_user
DB_PASSWORD=docker_password
DB_NAME=product_db
PORT=3000
NODE_ENV=production
No docker-compose.yml para o front_products:

WAIT_FOR_API: Define se o frontend deve esperar a API (definido como "true").
API_URL: URL da API que o frontend irá consumir. É crucial que esta URL seja o nome do serviço da API na rede Docker (http://api_products:3000).
5. Como Rodar a Aplicação
5.1. Iniciando com Docker Compose
Para construir as imagens e iniciar todos os serviços (banco de dados, backend e frontend) em modo de "detached" (em segundo plano), navegue até o diretório raiz do projeto (onde está o docker-compose.yml) e execute o seguinte comando:

Bash

docker compose up --build -d --force-recreate
up: Inicia os serviços.
--build: Garante que as imagens sejam construídas a partir dos Dockerfiles mais recentes.
-d: Executa os contêineres em modo "detached" (em segundo plano).
--force-recreate: Recria os contêineres mesmo que suas configurações não tenham mudado, útil para garantir que novos builds sejam usados.
A primeira inicialização pode levar alguns minutos, pois as imagens base serão baixadas e as imagens dos seus serviços serão construídas. O healthcheck com start_period garante que os serviços iniciem na ordem correta, aguardando a prontidão de suas dependências.

5.2. Parando a Aplicação
Para parar e remover todos os contêineres, redes e volumes criados pelo Docker Compose:

Bash

docker compose down -v
down: Para e remove os contêineres e redes.
-v: Também remove os volumes de dados anônimos. Se você quiser remover os dados do PostgreSQL (o volume postgres_data), use este comando. Cuidado: isso apagará todos os dados do banco de dados.
5.3. Reconstruindo Imagens
Se você fez alterações nos Dockerfiles ou nas dependências (package.json, etc.) de qualquer um dos serviços, é recomendável reconstruir as imagens:

Bash

docker compose build
E então, inicie novamente com:

Bash

docker compose up -d --force-recreate
6. Acessando a Aplicação
Após a inicialização bem-sucedida de todos os serviços:

API Backend: A API estará acessível em: http://localhost:3000
O endpoint de saúde deve responder em: http://localhost:3000/health
Frontend Web: A aplicação frontend estará acessível em: http://localhost:4000
7. Desenvolvimento (Para Contribuidores)
Para desenvolver em um dos serviços sem usar o Docker Compose para rodá-lo (mas ainda dependendo do PostgreSQL rodando via Docker Compose):

7.1. Backend (API Products)
Garanta que o PostgreSQL esteja rodando:
Bash

docker compose up -d postgres_db
Navegue até o diretório da API:
Bash

cd api-products
Instale as dependências:
Bash

npm install
Configure as variáveis de ambiente: Certifique-se de que seu arquivo .env está configurado corretamente para apontar para o host do PostgreSQL (se você estiver rodando fora do Docker Compose, pode precisar usar localhost ou o IP do Docker host se não estiver no WSL2 ou Linux).
Se você quiser que ele se conecte ao container product_postgres rodando via Docker Compose, e você está desenvolvendo na sua máquina host (fora de um container), você deve configurar DB_HOST=localhost em seu .env local, pois a porta 5432 do PostgreSQL está exposta para localhost.
Inicie a aplicação em modo de desenvolvimento:
Bash

npm run start:dev
7.2. Frontend (Front Products)
Garanta que a API Backend esteja rodando:
Ou via Docker Compose: docker compose up -d api_products
Ou em modo de desenvolvimento na sua máquina (conforme 7.1).
Navegue até o diretório do Frontend:
Bash

cd front-products
Instale as dependências:
Bash

npm install
Inicie a aplicação em modo de desenvolvimento:
Bash

npm run start
Certifique-se de que a URL da API configurada no ambiente de desenvolvimento do Angular (geralmente em environment.ts ou similar) aponte para a porta correta da API (ex: http://localhost:3000).
8. Considerações Importantes
Healthchecks e start_period: Os healthchecks e o start_period foram cuidadosamente configurados no docker-compose.yml para garantir que os serviços iniciem na ordem correta e só sejam considerados "saudáveis" quando estiverem realmente prontos para operar, resolvendo problemas de "race condition" na inicialização.
Volumes de Dados: O volume postgres_data garante que os dados do seu banco de dados PostgreSQL persistam mesmo que o contêiner do banco de dados seja removido.
Rede Docker: Todos os serviços estão na mesma app_network, permitindo que se comuniquem internamente pelos nomes dos serviços (ex: api_products se conecta a postgres_db).
Sinta-se à vontade para explorar os códigos e contribuir para o projeto!
