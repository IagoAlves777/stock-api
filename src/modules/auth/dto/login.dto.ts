import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginDTO {
  @IsNotEmpty()
  @ApiProperty({
    example: 'admin',
  })
  login: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 'admin123',
  })
  password: string;
}
