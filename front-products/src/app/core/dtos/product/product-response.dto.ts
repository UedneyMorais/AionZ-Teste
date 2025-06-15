export interface ProductResponseDto {
  id: number;
  slug: string;
  name: string;
  description: string;
  price: number | string;
  imagePath: string;
  createdAt?: string;
  updatedAt?: string;
}
