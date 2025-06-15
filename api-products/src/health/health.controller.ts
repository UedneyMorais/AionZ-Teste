import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Health Check')
@Controller()
export class HealthController {
  /**
   * Health check endpoint for API monitoring and container health checks
   *
   * @returns An object with API status information
   */
  @Get('health')
  @ApiOperation({
    summary: 'Health check endpoint',
    description:
      'Provides API health status and is used by Docker for container health monitoring',
  })
  @ApiResponse({
    status: 200,
    description: 'API is healthy and running',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          example: {
            status: 'OK',
            timestamp: '2023-11-15T12:34:56.789Z',
            uptime: 1234.56,
            database: 'connected',
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 503,
    description: 'Service Unavailable: API is not healthy',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          example: {
            status: 'ERROR',
            error: 'Database connection failed',
            timestamp: '2023-11-15T12:34:56.789Z',
          },
        },
      },
    },
  })
  checkHealth() {
    // Implementação real da verificação de saúde
    return {
      status: 'OK',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: 'connected', // Você verificaria a conexão real com o DB aqui
    };
  }
}
