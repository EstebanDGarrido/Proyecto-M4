import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber } from 'class-validator';
import { Categories } from 'src/categories/entities/categories.entity';

export class ProductResponseDto {
  @ApiProperty({ example: 'c7d9c17d-bb19-4f87-b05a-9de7f14567b3' })
  id: string;

  @ApiProperty({ example: 'Producto Ejemplo' })
  name: string;

  @ApiProperty({ example: 'Descripción del producto' })
  description: string;

  @ApiProperty({ example: 99.99 })
  price: number;

  @ApiProperty({ example: 10 })
  stock: number;

  @ApiProperty({ example: 'https://example.com/image.jpg' })
  imgUrl: string;

  @ApiProperty({
    type: Categories,
    description: 'Categoría asociada al producto',
  })
  category: Categories;
}

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Producto Actualizado', required: false })
  name?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Nueva descripción', required: false })
  description?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Samsung', required: false })
  marca?: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ example: 149.99, required: false })
  price?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ example: 20, required: false })
  stock?: number;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'https://example.com/new-image.jpg',
    required: false,
  })
  imgUrl?: string;
}
