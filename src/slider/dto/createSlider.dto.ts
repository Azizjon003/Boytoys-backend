import { IsNotEmpty } from 'class-validator';

export class createSliderDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  name_ru: string;
  @IsNotEmpty()
  name_eng: string;
}
