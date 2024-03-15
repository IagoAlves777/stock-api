import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { PrismaService } from '@shared/prisma/prisma.service';
import { ProductService } from '@modules/product/product.service';

@Injectable()
export class SalesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly productService: ProductService,
  ) {}
  async create(sale: CreateSaleDto) {
    try {
      const newSale = await this.prisma.sale.create({
        data: {
          date: new Date(sale.date),
          total: sale.total,
          user_id: sale.userId,
        },
      });

      await this.prisma.sale_product.createMany({
        data: sale.products.map((product) => ({
          total: product.amount * product.price,
          sale_id: newSale.id,
          product_id: product.id,
          amount: product.amount,
        })),
      });

      await Promise.all(
        sale.products.map(async (product) => {
          const oldProduct = await this.productService.findOne(product.id);

          await this.prisma.product.update({
            where: {
              id: product.id,
            },
            data: {
              amount: oldProduct.amount - product.amount,
            },
          });
        }),
      );
    } catch (error) {
      throw new BadRequestException({
        statusCode: 400,
        message: [
          'Ocorreu um erro durante o processamento da venda por favor tente novamente.',
        ],
        error: error.message,
      });
    }
  }

  async findAll() {
    const sales = await this.prisma.sale.findMany({
      include: {
        sale_product: {
          include: {
            product: true,
          },
        },
      },
    });

    return sales;
  }

  async findOne(id: string) {
    return await this.prisma.sale.findFirst({
      where: {
        id,
      },
      include: {
        sale_product: {
          include: {
            product: true,
          },
        },
      },
    });
  }
}
