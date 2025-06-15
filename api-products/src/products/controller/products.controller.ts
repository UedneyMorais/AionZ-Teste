import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UseInterceptors,
  UploadedFile,
  Patch,
  Delete,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiConsumes,
  ApiBody,
  ApiTags,
  ApiResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { multerOptions } from '../../common/config/multer.config';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductsService } from '../service/products.service';
import { BadRequestException } from '../../common/exceptions/bad-request.exception';
import { Product } from '../entities/product.entity';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  /**
   * Creates a new product with its associated image.
   *
   * @param createProductDto - The data transfer object containing product details.
   * @param image - The product image file.
   * @returns A Promise that resolves to the newly created Product entity.
   */
  @Post('/new')
  @ApiOperation({ summary: 'Create a new product' }) // Added summary for clarity
  @ApiResponse({
    status: 201,
    description: 'The product has been successfully created.',
    type: Product, // Specify the return type for better documentation
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request: Invalid input data or missing image.',
  })
  @UseInterceptors(FileInterceptor('image', multerOptions))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'The name of the product.',
          example: 'Luxury Smartwatch',
        },
        description: {
          type: 'string',
          description: 'A brief description of the product.',
          example:
            'A stylish and powerful smartwatch with advanced health tracking.',
        },
        price: {
          type: 'number',
          format: 'float', // Use format for numbers with decimals
          description: 'The price of the product.',
          example: 299.99,
        },
        image: {
          type: 'string',
          format: 'binary',
          description: 'The product image file (JPG, JPEG, PNG, GIF).',
        },
      },
      required: ['name', 'description', 'price', 'image'], // Explicitly list required fields
    },
  })
  create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<Product> {
    if (!image) throw new BadRequestException('Imagem é obrigatória');
    return this.productsService.create(createProductDto, image);
  }

  /**
   * Retrieves a list of all products.
   *
   * @returns A Promise that resolves to an array of Product entities.
   */
  @Get()
  @ApiOperation({ summary: 'Retrieve all products' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all products.',
    type: [Product],
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error: Failed to retrieve products.',
  })
  findAll() {
    return this.productsService.findAll();
  }

  /**
   * Retrieves a single product by its ID.
   *
   * @param id - The unique identifier of the product.
   * @returns A Promise that resolves to the found Product entity.
   */
  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a product by ID' })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the product.',
    type: Number, // Specify type for path parameter
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the product.',
    type: Product,
  })
  @ApiResponse({ status: 400, description: 'Bad Request: Invalid product ID.' })
  @ApiResponse({ status: 404, description: 'Not Found: Product not found.' })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error: Failed to retrieve product.',
  })
  findOne(@Param('id') id: number) {
    return this.productsService.findOne(id);
  }

  /**
   * Retrieves a single product by its ID.
   *
   * @param id - The unique identifier of the product.
   * @returns A Promise that resolves to the found Product entity.
   */
  @Get('/slug/:slug')
  @ApiOperation({ summary: 'Retrieve a product by slug' })
  @ApiParam({
    name: 'slug',
    description: 'The slug of the product.',
    type: String,
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the product.',
    type: Product,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request: Invalid product slug.',
  })
  @ApiResponse({ status: 404, description: 'Not Found: Product not found.' })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error: Failed to retrieve product.',
  })
  findOneBySlug(@Param('slug') slug: string) {
    return this.productsService.findOneBySlug(slug);
  }

  /**
   * Updates an existing product's details and/or image.
   *
   * @param id - The unique identifier of the product to update.
   * @param updateProductDto - The data transfer object containing product details to update (optional fields).
   * @param image - The new product image file (optional).
   * @returns A Promise that resolves to the updated Product entity.
   */
  @Patch('/edit/:id')
  @ApiOperation({ summary: 'Update an existing product' })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the product to update.',
    type: Number,
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'The product has been successfully updated.',
    type: Product,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request: Invalid input data or invalid product ID.',
  })
  @ApiResponse({ status: 404, description: 'Not Found: Product not found.' })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error: Failed to update the product.',
  })
  @UseInterceptors(FileInterceptor('image', multerOptions))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'The new name of the product.',
          example: 'Updated Smartwatch Pro',
        },
        description: {
          type: 'string',
          description: 'The updated description of the product.',
          example:
            'An even better model with extended battery life and new features.',
        },
        price: {
          type: 'number',
          format: 'float',
          description: 'The new price of the product.',
          example: 349.99,
        },
        image: {
          type: 'string',
          format: 'binary',
          description: 'The new product image file (optional).',
        },
      },
    },
  })
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    return this.productsService.update(+id, updateProductDto, image);
  }

  @Delete('/delete/:id')
  @ApiOperation({ summary: 'Delete a product by ID' })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the product to delete.',
    type: Number,
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'The product has been successfully deleted.',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Product successfully deleted.',
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found: Product with the given ID was not found.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error: Failed to delete the product.',
  })
  async remove(@Param('id') id: string) {
    await this.productsService.remove(+id);
    return { message: 'Product successfully deleted.' };
  }
}
