import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { HashModule } from '@shared/hash/hash.module';
import { UsersModule } from '@modules/users/users.module';
import { JwtModule } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule, HashModule, JwtModule],
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
