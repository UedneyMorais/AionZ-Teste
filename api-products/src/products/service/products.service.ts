/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, Logger } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { generateSlug } from '../../common/utils/slugify.util';
import { InternalServerError } from '../../common/exceptions/internal-server-error.exception';
import { NotFoundException } from '../../common/exceptions/not-found.exception';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(
    createProductDto: CreateProductDto,
    image: Express.Multer.File,
  ): Promise<Product> {
    const slug = generateSlug(createProductDto.name);

    const imagePath = `/uploads/${image.filename}`;

    const product = this.productRepository.create({
      ...createProductDto,
      imagePath,
      slug,
    });

    if (!product) {
      throw new InternalServerError();
    }

    return this.productRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException();
    }

    return product;
  }

  async findOneBySlug(slug: string): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { slug: slug },
    });
    if (!product) {
      throw new NotFoundException();
    }

    return product;
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
    image?: Express.Multer.File,
  ): Promise<Product> {
    const productFound = await this.findOne(id);
    if (!productFound) {
      throw new NotFoundException();
    }

    let newImagePath = productFound.imagePath;

    if (image) {
      newImagePath = image.path;

      if (productFound.imagePath && productFound.imagePath !== newImagePath) {
        const oldImagePathAbsolute = path.join(
          process.cwd(),
          productFound.imagePath,
        );
        if (fs.existsSync(oldImagePathAbsolute)) {
          try {
            fs.unlinkSync(oldImagePathAbsolute);
          } catch (error) {
            this.logger.warn(
              `Falha ao remover imagem antiga ${oldImagePathAbsolute}: ${error.message}`,
            );
          }
        } else {
          this.logger.log(
            `Caminho de imagem antiga no DB, mas arquivo não encontrado no disco: ${oldImagePathAbsolute}`,
          );
        }
      }
    }
    let newSlug = productFound.slug;
    if (updateProductDto.name && updateProductDto.name !== productFound.name) {
      newSlug = generateSlug(updateProductDto.name);
    }

    Object.assign(productFound, updateProductDto);
    productFound.imagePath = newImagePath;
    productFound.slug = newSlug;

    try {
      return await this.productRepository.save(productFound);
    } catch (error) {
      this.logger.error(
        'Erro ao salvar atualização do produto no banco de dados.',
        error.stack,
      );
      throw new InternalServerError(
        'Falha ao atualizar o produto no banco de dados.',
      );
    }
  }

  async remove(id: number) {
    const productFound = await this.findOne(id);
    if (!productFound) {
      throw new NotFoundException();
    }
    return this.productRepository.delete(id);
  }
}
