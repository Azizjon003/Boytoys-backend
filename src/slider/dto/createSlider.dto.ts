import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class createSliderDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  name_ru: string;

  @IsNotEmpty()
  @ApiProperty()
  name_eng: string;

  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  description_ru: string;

  @IsNotEmpty()
  @ApiProperty()
  description_eng: string;

  @ApiProperty()
  @IsNotEmpty()
  image: string;
  @ApiProperty()
  @IsNotEmpty()
  image_ru: string;
  @IsNotEmpty()
  @ApiProperty()
  image_eng: string;
}
