import { ApiProperty } from '@nestjs/swagger';

export class DeleteResponseDto {
  @ApiProperty({ example: 'Recurso eliminado exitosamente' })
  message: string;

  @ApiProperty({ example: 'c7d9c17d-bb19-4f87-b05a-9de7f14567b3' })
  id: string;
}

export class MessageResponseDto {
  @ApiProperty({ example: 'Operación realizada exitosamente' })
  message: string;
}
