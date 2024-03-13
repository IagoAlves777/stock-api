import { UsersService } from '@modules/users/users.service';
import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HashService } from '@shared/hash/hash.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private hashService: HashService,
    private jwtService: JwtService,
  ) {}

  async login(login: string, password: string) {
    const user = await this.usersService.findByLogin(login);

    if (!user) {
      throw new ForbiddenException();
    }

    const passwordMatched = await this.hashService.compareHash(
      password,
      user.password,
    );

    if (passwordMatched) {
      throw new ForbiddenException();
    }

    const payload = {
      login: user.login,
      name: user.name,
      role: user.role,
    };

    return {
      user: payload,
      accessToken: this.jwtService.sign(payload),
    };
  }

  async getCurrentUser(userId: string) {
    const user = this.usersService.findById(userId);

    if (!user) {
      throw new UnauthorizedException();
    }

    return {
      user,
    };
  }
}
