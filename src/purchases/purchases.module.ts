import { Module } from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { PurchasesController } from './purchases.controller';
import { PurchasesEntity } from './entities/purchase.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [PurchasesController],
  providers: [PurchasesService],
  imports: [
    TypeOrmModule.forFeature([ PurchasesEntity ])]
})
export class PurchasesModule {}
