import { ApiProperty } from '@nestjs/swagger';
import { Equals, IsNotEmpty, Matches, ValidateIf } from 'class-validator';

enum gender {
  male = 'male',
  female = 'female',
}

export class createAuthDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  phone: string;

  @ApiProperty()
  @IsNotEmpty()
  gender: gender;

  @ApiProperty()
  @IsNotEmpty()
  birthday: Date;

  @ApiProperty()
  @IsNotEmpty()
  @Matches(/^[0-9]{6}$/)
  code: string;
}
export class loginAuthDto {
  @ApiProperty()
  @IsNotEmpty()
  phone: string;

  @ApiProperty()
  @IsNotEmpty()
  code: string;
}
export class updatePasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  password: string;
}

export class updateMeDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  birthday: Date;
}

export class checkPhoneDto {
  @ApiProperty()
  @IsNotEmpty()
  phone: string;
}
