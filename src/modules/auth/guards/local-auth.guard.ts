import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

const token = 'QAZ3WSX4EDx5CRF6Vgt7bH8YNj8KU9MILDS5cR6V7TY8b6RCSC';

@Injectable()
export class LocalAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const { headers } = context.switchToHttp().getRequest();

    return headers.token === token;
  }
}
