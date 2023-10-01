import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class updateStatusDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  name_ru: string;

  @ApiProperty()
  name_eng: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  description_ru: string;

  @ApiProperty()
  description_eng: string;

  @ApiProperty()
  image: string;

  @ApiProperty()
  image_ru: string;

  @ApiProperty()
  image_eng: string;
}
