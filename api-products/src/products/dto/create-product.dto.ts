import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateProductDto {
  @IsString({ message: 'O nome deve ser um texto(string)' })
  @IsNotEmpty({ message: 'O nome do produto é obrigatório' })
  @MinLength(3, { message: 'O nome deve ter pelo menos 3 caracteres.' })
  name: string;
  @IsString({ message: 'A descrição deve ser um texto(string)' })
  @IsNotEmpty({ message: 'A descrição do produto é obrigatória' })
  @MinLength(5, { message: 'A descrição ter pelo menos 5 caracteres.' })
  description: string;

  @IsNotEmpty({ message: 'O preço do produto é obrigatório' })
  price: number;
}
