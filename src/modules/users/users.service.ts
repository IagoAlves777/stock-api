import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HashService } from '@shared/hash/hash.service';
import { PrismaService } from '@shared/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hashService: HashService,
  ) {}

  async create(user: CreateUserDto) {
    const password = (
      await this.hashService.generateHash(user.password)
    ).toUpperCase();

    try {
      return await this.prisma.users.create({
        data: {
          login: user.login,
          name: user.name,
          password,
          role: user.role,
        },
      });
    } catch (error) {
      throw new BadRequestException({
        statusCode: 400,
        error: error.message,
      });
    }
  }

  async findAll() {
    return await this.prisma.users.findMany();
  }

  async findById(id: string) {
    try {
      if (!id) {
        throw new BadRequestException();
      }

      return await this.prisma.users.findUnique({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw new BadRequestException({
        statusCode: 400,
        error: error.message,
      });
    }
  }

  async findByLogin(login: string) {
    return await this.prisma.users.findFirst({
      where: {
        login,
      },
    });
  }

  async update(id: string, user: UpdateUserDto) {
    return await this.prisma.users.update({
      where: {
        id,
      },
      data: {
        name: user.name,
      },
    });
  }
}
