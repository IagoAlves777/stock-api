import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @ApiProperty({
    example: 'Feijão 1kg',
  })
  name: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 9.88,
  })
  price: number;

  @IsNotEmpty()
  @ApiProperty({
    example: 260,
  })
  amount: number;
}
