import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { PrismaModule } from '@shared/prisma/prisma.module';
import { ProductModule } from '@modules/product/product.module';

@Module({
  controllers: [SalesController],
  providers: [SalesService],
  imports: [PrismaModule, ProductModule],
})
export class SalesModule {}
