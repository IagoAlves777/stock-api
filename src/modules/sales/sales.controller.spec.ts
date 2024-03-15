import { Test, TestingModule } from '@nestjs/testing';
import { SalesController } from './sales.controller';
import { SalesService } from './sales.service';
import { SalesModule } from './sales.module';
import { PrismaModule } from '@shared/prisma/prisma.module';
import { ProductModule } from '@modules/product/product.module';

describe('SalesController', () => {
  let controller: SalesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SalesModule, PrismaModule, ProductModule],
      controllers: [SalesController],
      providers: [SalesService],
    }).compile();

    controller = module.get<SalesController>(SalesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
