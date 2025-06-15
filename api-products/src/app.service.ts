import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    // Retorna uma string HTML simples
    return `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Bem-vindo à Minha API de Produtos</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            background-color: #f4f4f4;
            color: #333;
            text-align: center;
          }
          h1 {
            color: #007bff;
            margin-bottom: 20px;
          }
          p {
            font-size: 1.1em;
            margin-bottom: 30px;
          }
          a {
            display: inline-block;
            padding: 12px 25px;
            background-color: #28a745;
            color: white;
            text-decoration: none;
            border-radius: 8px;
            font-weight: bold;
            transition: background-color 0.3s ease;
          }
          a:hover {
            background-color: #218838;
          }
        </style>
      </head>
      <body>
        <h1>Bem-vindo à Minha API de Produtos</h1>
        <p>Esta é a API para gerenciamento de produtos.</p>
        <a href="/api" target="_blank">Acessar Documentação Swagger</a>
      </body>
      </html>
    `;
  }
}
