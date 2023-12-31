import { RolesGuard } from './role.guard';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthProviders } from './auth.providers';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './dto/auth.constant';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '90d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, ...AuthProviders, AuthGuard, RolesGuard],
})
export class AuthModule {}
