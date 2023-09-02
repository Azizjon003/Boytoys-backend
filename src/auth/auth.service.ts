import {
  HttpCode,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Auth } from './auth.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { createAuthDto, loginAuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  async signIn(createAuthDto: createAuthDto) {
    const isConfirm = this.validatePasswordConfirm(
      createAuthDto.password,
      createAuthDto.passwordConfirm,
    );

    if (!isConfirm) {
      throw new HttpException("Password doesn't match", 400);
    }

    const salt = await bcrypt.genSalt();

    const hashedPassword = await this.hashPassword(
      createAuthDto.password,
      salt,
    );
    const data = {
      name: createAuthDto.name,
      phone: createAuthDto.phone,
      gender: createAuthDto.gender,
      birthday: createAuthDto.birthday,
      password: hashedPassword,
    };
    let user;
    try {
      user = await Auth.create(data);
    } catch (er) {
      console.log(er);
      throw new UnauthorizedException();
    }

    const userPayload = {
      id: user.id,
      phone: user.phone,
    };

    return {
      access_token: await this.jwtService.signAsync(userPayload),
    };
  }

  async login(loginAuthDto: loginAuthDto) {
    const { phone, password } = loginAuthDto;
    const isPhone = await Auth.findOne({
      where: {
        phone,
      },
    });

    if (!isPhone) {
      throw new HttpException('Creadentials not found', 400);
    }

    const hashPassword = isPhone.password;

    const isTrue = await this.comparePassword(password, hashPassword);

    if (!isTrue) {
      throw new HttpException('Creadentials not found', 400);
    }
    const userPayload = {
      id: isPhone.id,
      phone: isPhone.phone,
    };

    return {
      access_token: await this.jwtService.signAsync(userPayload),
    };
  }

  async getMe(id: number) {
    const user = await Auth.findOne({
      attributes: ['name', 'phone', 'birthday', 'gender', 'role', 'id'],
      where: {
        id,
      },
    });
    if (!user) {
      throw new HttpException('User not found', 400);
    }
    return user;
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  validatePasswordConfirm(password: string, passwordConfirm: string): boolean {
    return password === passwordConfirm;
  }

  private async comparePassword(
    password: string,
    hashPasswor: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashPasswor);
  }
}
