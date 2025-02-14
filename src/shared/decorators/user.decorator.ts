import { Request } from 'express';
import { _ISafeUser } from '../interfaces/users.interface';
import { ExecutionContext } from '@nestjs/common';
import { createParamDecorator } from '@nestjs/common/decorators/http';

export const User = createParamDecorator(
  (data: keyof _ISafeUser, ctx: ExecutionContext): _ISafeUser | any => {
    const request: Request = ctx.switchToHttp().getRequest();
    const user = request.user as _ISafeUser;
    return data ? user[data] : user;
  }
);
