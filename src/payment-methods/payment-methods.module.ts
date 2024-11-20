import { Module } from '@nestjs/common';
import { PaymentMethodService } from './payment-methods.service';
import { PaymentMethodController } from './payment-methods.controller';
import { PaymentMethodEntity } from './entities/payment-method.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [PaymentMethodController],
  providers: [PaymentMethodService],
  imports: [
    TypeOrmModule.forFeature([ PaymentMethodEntity ])
  ]
})
export class PaymentMethodsModule {}
