import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class createSliderDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;
  @ApiProperty()
  @IsNotEmpty()
  @ApiProperty()
  name_ru: string;
  @IsNotEmpty()
  @ApiProperty()
  name_eng: string;
}
