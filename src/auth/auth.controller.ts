import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { createAuthDto, loginAuthDto } from './dto/auth.dto';
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

  @Get('me')
  @UseGuards(AuthGuard)
  getMe(@getUser() user: Auth) {
    return this.authservice.getMe(user.id);
  }
}
