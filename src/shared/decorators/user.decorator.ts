import { Request } from 'express';
import { _ISafeUser } from '../interfaces/users.interface';
import { createParamDecorator } from '@nestjs/common/decorators/http';
import { ExecutionContext } from '@nestjs/common/interfaces/features/execution-context.interface';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): _ISafeUser => {
    const request: Request = ctx.switchToHttp().getRequest();
    return request.user;
  }
);
