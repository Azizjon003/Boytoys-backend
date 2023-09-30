import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class createPaymentsDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;
}
