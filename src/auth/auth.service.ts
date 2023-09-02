import {
  HttpCode,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { otpGen } from 'otp-gen-agent';
import { Auth } from './auth.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { createAuthDto, loginAuthDto, updateMeDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  async signIn(createAuthDto: createAuthDto) {
    const { phone } = createAuthDto;

    const user = await Auth.findOne({
      where: {
        phone,
      },
    });

    if (!user) {
      throw new HttpException('User not found', 400);
    }

    if (user.code !== createAuthDto.code) {
      throw new HttpException('Code not found', 400);
    }

    if (
      user.code === createAuthDto.code &&
      user.phone === createAuthDto.phone
    ) {
      const data = {
        name: createAuthDto.name,
        phone: createAuthDto.phone,
        gender: createAuthDto.gender,
        birthday: createAuthDto.birthday,
        createdAt: new Date(),
        token: null,
        isPhoneVerifired: true,
        code: null,
        codeExpired: null,
      };

      const userPayload = {
        id: user.id,
        phone: user.phone,
      };

      const token = await this.jwtService.signAsync(userPayload);

      data.token = token;
      await user.update(data, {
        where: {
          id: user.id,
        },
      });

      return {
        access_token: token,
      };
    } else {
      throw new HttpException('Code not found', 400);
    }
  }

  async login(loginAuthDto: loginAuthDto) {
    const { phone, code } = loginAuthDto;
    const isPhone = await Auth.findOne({
      where: {
        phone,
      },
    });

    if (!isPhone) {
      throw new HttpException('Creadentials not found', 400);
    }

    if (isPhone.code !== code) {
      throw new HttpException('Creadentials not found', 400);
    }

    const userPayload = {
      id: isPhone.id,
      phone: isPhone.phone,
    };

    const token = await this.jwtService.signAsync(userPayload);
    isPhone.code = null;
    isPhone.codeExpired = null;
    isPhone.phoneVerifired = true;
    isPhone.token = token;
    await isPhone.save();

    return {
      access_token: token,
    };
  }

  async getMe(id: number) {
    const user = await Auth.findOne({
      attributes: [
        'id',
        'name',
        'phone',
        'birthday',
        'gender',
        'role',
        'createdAt',
      ],
      where: {
        id,
      },
    });
    if (!user) {
      throw new HttpException('User not found', 400);
    }
    return user;
  }

  async updateMe(updateMeDto: updateMeDto, id: number) {
    const user = await Auth.findByPk(id);

    user.name = updateMeDto.name || user.name;
    user.birthday = updateMeDto.birthday || user.birthday;

    await user.save();

    return user;
  }

  async checkPhone(phone: string) {
    const user = await Auth.findOne({
      where: {
        phone,
      },
    });
    const generateCode = await otpGen();
    if (!user) {
      const authUser = await Auth.create({
        phone,
        code: generateCode,
        codeExpired: new Date(Date.now() + 300000),
      });
      return {
        url: '/sign-in',
        generateCode,
        phone: phone,
      };
    }

    user.code = generateCode;
    user.codeExpired = new Date(Date.now() + 300000);
    await user.save();
    return {
      phone: phone,
      url: '/sign-up',
      generateCode: generateCode,
    };
  }

  async logout(id: number) {
    const user = await Auth.findByPk(id);
    user.token = null;
    await user.save();
    return {
      message: 'Logout success',
    };
  }
}
