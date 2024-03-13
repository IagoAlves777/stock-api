import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './modules/users/users.controller';
import { UsersModule } from './modules/users/users.module';
import { ProductModule } from './modules/product/product.module';
import { SalesModule } from './modules/sales/sales.module';

@Module({
  imports: [UsersModule, ProductModule, SalesModule],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule {}
