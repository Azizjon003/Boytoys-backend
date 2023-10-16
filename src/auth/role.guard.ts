import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
  SetMetadata,
} from '@nestjs/common';
import { Auth } from './auth.entity';
import { Role } from './helper/role';
import { Reflector } from '@nestjs/core';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = ['admin'];
    const request = context.switchToHttp().getRequest();
    const u = request.user;
    const user = await Auth.findOne({ where: { id: u.id } });
    if (!user) {
      throw new HttpException('User not found', 404);
    }

    console.log('user', user);
    return this.matchRoles(roles, user.role);
  }

  private matchRoles(roles: string[], userRole: string): boolean {
    return roles.includes(userRole);
  }
}
