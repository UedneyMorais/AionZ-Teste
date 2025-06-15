/* eslint-disable @typescript-eslint/no-unused-vars */
import { TestingModule, Test } from '@nestjs/testing';
import { ProductsService } from '../service/products.service';
import { ProductsController } from './products.controller';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService; // Opcional, mas útil para espiar chamadas

  const mockProductRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        ProductsService,
        {
          provide: 'ProductRepository',
          useValue: mockProductRepository,
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService); // Obtenha o serviço para espiar chamadas, se precisar
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
