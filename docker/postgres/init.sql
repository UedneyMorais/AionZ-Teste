CREATE USER docker_user WITH PASSWORD 'docker_password';
CREATE DATABASE product_db;
GRANT ALL PRIVILEGES ON DATABASE product_db TO docker_user;