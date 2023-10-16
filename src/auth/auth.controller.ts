import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  checkPhoneDto,
  createAuthDto,
  loginAuthDto,
  updateMeDto,
  updatePasswordDto,
} from './dto/auth.dto';
import { AuthGuard } from './auth.guard';
import { getUser } from './getUser.decorator';
import { Auth } from './auth.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles, RolesGuard } from './role.guard';
import { Role } from './helper/role';
import { updateOrdersDto } from 'src/orders/dto/orders.dto';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authservice: AuthService) {}

  @Post('sign-in')
  signIn(@Body(ValidationPipe) createAuthDto: createAuthDto) {
    return this.authservice.signIn(createAuthDto);
  }

  @Post('sign-up')
  signUp(@Body(ValidationPipe) loginAuthDto: loginAuthDto) {
    return this.authservice.login(loginAuthDto);
  }

  @Post('check-phone')
  checkPhone(@Body(ValidationPipe) checkPhoneDto: checkPhoneDto) {
    return this.authservice.checkPhone(checkPhoneDto.phone);
  }

  @Get('me')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  getMe(@getUser() user: Auth) {
    return this.authservice.getMe(user.id);
  }

  @Patch('update-me')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  updateMe(
    @getUser() user: Auth,
    @Body(ValidationPipe) updateMeDto: updateMeDto,
  ) {
    return this.authservice.updateMe(updateMeDto, user.id);
  }

  @Get('logout')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  logout(@getUser() user: Auth) {
    return this.authservice.logout(user.id);
  }

  @Get('get-users')
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  getUsers(@getUser() user: Auth) {
    return this.authservice.getUsers();
  }

  @Get('get-user/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  getUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.authservice.getUser(id);
  }

  @Patch('update-user/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  updateUser(@Param('id', ParseUUIDPipe) id: string, updateMeDto: updateMeDto) {
    return this.authservice.updateUser(id, updateMeDto);
  }

  @Patch('/delete-user/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.authservice.deleteUser(id);
  }

  //orders

  @Get('/get-orders-user/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  getOrderbyUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.authservice.getOrderByUser(id);
  }
}
