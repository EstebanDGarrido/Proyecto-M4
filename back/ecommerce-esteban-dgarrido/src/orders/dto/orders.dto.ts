import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OrderProductDto {
  @IsNotEmpty({ message: 'No puede estar vacío' })
  @IsUUID(4, { message: 'Debe ser un UUID v4' })
  @ApiProperty({
    example: 'Ingresar el ID del producto',
    description: 'ID único del producto (UUID v4)',
  })
  id: string;
}

export class CreateOrderDto {
  @IsNotEmpty({ message: 'No puede estar vacío' })
  @IsUUID(4, { message: 'Debe ser un UUID v4' })
  @ApiProperty({
    example: 'Ingresar el ID del usuario',
    description: 'ID único del usuario (UUID v4)',
  })
  userId: string;

  @IsArray({ message: 'Debe ser un array' })
  @ArrayNotEmpty({ message: 'El array no puede estar vacío' })
  @ArrayMinSize(1, { message: 'Al menos un producto' })
  @ApiProperty({
    type: [OrderProductDto],
    description: 'Array de productos con sus IDs',
  })
  products: OrderProductDto[];
}
