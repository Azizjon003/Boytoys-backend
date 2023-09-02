import { Equals, IsNotEmpty, Matches, ValidateIf } from 'class-validator';

enum gender {
  male = 'male',
  female = 'female',
}

export class createAuthDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  phone: string;
  @IsNotEmpty()
  gender: gender;
  @IsNotEmpty()
  birthday: Date;

  @IsNotEmpty()
  @Matches(/^[0-9]{6}$/)
  code: string;
}
export class loginAuthDto {
  @IsNotEmpty()
  phone: string;
  @IsNotEmpty()
  code: string;
}
export class updatePasswordDto {
  @IsNotEmpty()
  password: string;
}

export class updateMeDto {
  name: string;
  birthday: Date;
}

export class checkPhoneDto {
  @IsNotEmpty()
  phone: string;
}
