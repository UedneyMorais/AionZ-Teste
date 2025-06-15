import { ProductResponseDto } from "../dtos/product/product-response.dto";

export interface Product {
  id: number;
  slug: string;
  name: string;
  description: string;
  price: number;
  imagePath: string;
}

export function productFromDto(dto: ProductResponseDto): Product {
  return {
    id: dto.id,
    slug: dto.slug,
    name: dto.name,
    description: dto.description,
    price: typeof dto.price === 'string' ? parseFloat(dto.price) : dto.price,
    imagePath: dto.imagePath
    // Ignora campos que não existem no Model (createdAt, updatedAt)
  };
}
