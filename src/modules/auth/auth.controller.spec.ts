import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '@modules/users/users.module';
import { HashModule } from '@shared/hash/hash.module';
import { JwtModule } from '@nestjs/jwt';
import { Role } from '@prisma/client';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule, HashModule, JwtModule],
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should return a token when valid credentials are provided', async () => {
      const mockReturn = {
        user: {
          id: '1',
          login: 'testuser',
          name: 'Test User',
          password: 'testpassword',
          role: 'user' as Role,
        },
        accessToken: 'mockedToken',
      };

      const loginDTO = { login: 'testuser', password: 'testpassword' };
      jest.spyOn(authService, 'login').mockResolvedValue(mockReturn);

      const result = await controller.login(loginDTO);

      expect(result.accessToken).toEqual(mockReturn.accessToken);
    });
  });

  describe('getCurrentUser', () => {
    it('should return the current user based on the request', async () => {
      const mockUser = {
        id: '1',
        login: 'testuser',
        name: 'Test User',
        password: 'testpassword',
        role: 'user' as Role,
      };

      const mockRequest: any = { user: { id: '1' } };

      jest.spyOn(authService, 'getCurrentUser').mockResolvedValue(mockUser);

      const result = await controller.getCurrentUser(mockRequest);

      expect(result).toEqual(mockUser);
    });
  });
});
