import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '@shared/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async create(product: CreateProductDto) {
    return await this.prisma.product.create({
      data: {
        price: product.price,
        amount: product.amount,
        name: product.name,
      },
    });
  }

  async findAll() {
    return await this.prisma.product.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }

  async findOne(id: string) {
    return await this.prisma.product.findFirst({
      where: {
        id,
      },
    });
  }

  async update(id: string, product: UpdateProductDto) {
    return this.prisma.product.update({
      where: {
        id,
      },
      data: {
        name: product.name,
        amount: product.amount,
        price: product.price,
      },
    });
  }
}
