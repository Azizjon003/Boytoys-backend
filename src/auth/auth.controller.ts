import {
  Body,
  Controller,
  Get,
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
  @UseGuards(AuthGuard)
  getMe(@getUser() user: Auth) {
    return this.authservice.getMe(user.id);
  }

  @Patch('update-me')
  @UseGuards(AuthGuard)
  updateMe(
    @getUser() user: Auth,
    @Body(ValidationPipe) updateMeDto: updateMeDto,
  ) {
    return this.authservice.updateMe(updateMeDto, user.id);
  }

  @Get('logout')
  @UseGuards(AuthGuard)
  logout(@getUser() user: Auth) {
    return this.authservice.logout(user.id);
  }
}
