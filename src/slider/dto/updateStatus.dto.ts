import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class updateStatusDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  name_ru: string;

  @ApiProperty()
  name_eng: string;
}
