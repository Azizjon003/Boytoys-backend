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
import { Order } from 'sequelize';
import { Orders } from 'src/orders/order.entity';

@Injectable()
export class AuthService {
  protected attr = ['id', 'name', 'phone', 'birthday'];
  constructor(private jwtService: JwtService) {}
  async signIn(createAuthDto: createAuthDto) {
    const { phone } = createAuthDto;

    const user = await Auth.findOne({
      where: {
        phone,
        signature: '/sign-in',
      },
    });

    console.log(user);
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
        phoneVerifired: true,
        code: null,
        codeExpired: null,
        signature: '/sign-up',
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
        signature: '/sign-up',
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
        signature: '/sign-in',
      });

      return {
        url: '/sign-in',
        generateCode,
        phone: phone,
      };
    }

    const verified = user.phoneVerifired;
    user.code = generateCode;
    user.codeExpired = new Date(Date.now() + 300000);
    user.signature = !verified ? '/sign-in' : '/sign-up';

    await user.save();
    return {
      phone: phone,
      url: !verified ? '/sign-in' : '/sign-up',
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
  // Admin
  async getUsers(): Promise<Auth[]> {
    const users = await Auth.findAll({
      attributes: this.attr,
    });

    return users;
  }
  async getUser(id: string): Promise<Auth[]> {
    const user = await Auth.findAll({
      where: {
        id,
      },
      attributes: this.attr,
    });

    if (!user) {
      throw new HttpException('User not found', 400);
    }

    return user;
  }

  async updateUser(id: string, updateMeDto: updateMeDto): Promise<Auth> {
    const user = await Auth.findByPk(id, {
      attributes: this.attr,
    });

    if (user) {
      throw new HttpException('User not found', 400);
    }

    user.name = updateMeDto.name || user.name;
    user.birthday = updateMeDto.birthday || user.birthday;

    await user.save();
    return user;
  }

  async deleteUser(id: string): Promise<Auth> {
    const user = await Auth.findByPk(id, {
      attributes: this.attr,
    });

    if (!user) {
      throw new HttpException('User not found', 400);
    }

    user.status = 'deleted';

    await user.save();
    return user;
  }

  async getOrderByUser(id: string): Promise<Orders[]> {
    const user = await Auth.findByPk(id);
    if (!user) {
      throw new HttpException('User not found', 400);
    }

    const order = await Orders.findAll({
      where: {
        userId: id,
      },
    });

    if (!order) {
      throw new HttpException('Order not found', 400);
    }
    return order;
  }
}
