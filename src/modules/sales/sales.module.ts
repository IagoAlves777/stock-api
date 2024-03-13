import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { PrismaModule } from '@shared/prisma/prisma.module';

@Module({
  controllers: [SalesController],
  providers: [SalesService],
  imports: [PrismaModule],
})
export class SalesModule {}
