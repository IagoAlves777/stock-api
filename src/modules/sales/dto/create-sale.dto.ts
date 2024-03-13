import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class Product {
  @ApiProperty({
    example: '99baee504a1fe91a07bc66b6900bd39874191889',
  })
  id: string;

  @ApiProperty({
    example: 15.5,
  })
  price: number;

  @ApiProperty({
    example: 2,
  })
  amount: number;
}

export class CreateSaleDto {
  @IsNotEmpty()
  @ApiProperty({
    example: '2024-03-14',
  })
  date: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 105.24,
  })
  total: number;

  @IsNotEmpty()
  @ApiProperty({ isArray: true, type: Product })
  products: {
    id: string;
    amount: number;
    price: number;
  }[];
}
