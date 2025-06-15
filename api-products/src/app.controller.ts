import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('API Root')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Provides a welcome message and a link to the API documentation (Swagger UI).
   *
   * @returns An HTML page with welcome information.
   */
  @Get()
  @ApiOperation({ summary: 'Get API welcome page / homepage' })
  @ApiResponse({
    status: 200,
    description: 'API welcome page / HTML content.',
    content: {
      'text/html': {
        schema: {
          type: 'string',
          example: `
            <!DOCTYPE html>
            <html lang="pt-BR">
            <body>
              <h1>Bem-vindo à Minha API de Produtos</h1>
              <p>Esta é a API para gerenciamento de produtos.</p>
              <a href="/api" target="_blank">Acessar Documentação Swagger</a>
            </body>
            </html>
          `, // Um exemplo do conteúdo HTML retornado
        },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error: Failed to render welcome page.',
  })
  getHello(): string {
    return this.appService.getHello();
  }
}
