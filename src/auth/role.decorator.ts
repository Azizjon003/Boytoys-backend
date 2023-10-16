import { SetMetadata, createParamDecorator } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './helper/role';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
