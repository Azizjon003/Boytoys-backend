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
  password: string;

  @IsNotEmpty()
  passwordConfirm: string;
}
export class loginAuthDto {
  @IsNotEmpty()
  phone: string;
  @IsNotEmpty()
  password: string;
}
