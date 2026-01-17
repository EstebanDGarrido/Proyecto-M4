import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsUUID,
} from 'class-validator';
import { Products } from 'src/products/entities/products.entity';

export class CreateOrderDto {
  @IsNotEmpty({ message: 'No puede estar vacío' })
  @IsUUID(4, { message: 'Debe ser un UUID v4' })
  userId: string;

  @IsArray({ message: 'Debe ser un array' })
  @ArrayNotEmpty({ message: 'El array no puede estar vacío' })
  @ArrayMinSize(1, { message: 'Al menos un producto' })
  products: Partial<Products>[];
}
