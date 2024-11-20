import { Injectable } from '@nestjs/common';
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment-method.dto';
import { PaymentMethodEntity } from './entities/payment-method.entity';
import { PaginationDto } from 'src/common/dtos/pagination/pagination.dto';
import { ManagerError } from 'src/common/errors/manager.error';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { ResponseAllPaymentMethods } from './interfaces/response-payment-methods.interface';

@Injectable()
export class PaymentMethodService {

  constructor(
    @InjectRepository(PaymentMethodEntity)
    private readonly paymentMethodRepository: Repository<PaymentMethodEntity>,
  ){}

  async create(createPaymentMethodDto: CreatePaymentMethodDto): Promise<PaymentMethodEntity> {
    try {
      const paymentMethod = await this.paymentMethodRepository.save(createPaymentMethodDto);
      if( !paymentMethod ){
        throw new ManagerError({
          type: 'CONFLICT',
          message: 'Product not created!',
        });
      }
      return paymentMethod;
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async findAll(paginationDto: PaginationDto): Promise<ResponseAllPaymentMethods> {
    const { limit, page } = paginationDto;
    const skip = (page - 1) * limit;

    try {

      const [total, data] = await Promise.all([
        this.paymentMethodRepository.count({ where: { isActive: true } }),
        this.paymentMethodRepository.find({ where: { isActive: true }, take: limit, skip: skip })
      ]);

      const lastPage = Math.ceil(total / limit);

      return {
        page,
        limit,
        lastPage,
        total,
        data
      };
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async findOne(id: string): Promise<PaymentMethodEntity> {
    try {
      const paymentMethod = await this.paymentMethodRepository.createQueryBuilder('paymentMethod')
      .where({id, isActive:true})
      .getOne()
      if (!paymentMethod) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: "Payment Method not found",
        })
      }

      return paymentMethod
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }
  
  async update(id: string, updatePaymentMethodDto: UpdatePaymentMethodDto): Promise<UpdateResult> {
    try {
      const paymentMethod = await this.paymentMethodRepository.update( {id, isActive: true}, updatePaymentMethodDto );
      if ( paymentMethod.affected === 0 ) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'Payment Method not found!',
        })
      }

      return paymentMethod;
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async remove(id: string): Promise<UpdateResult> {
    try {
      const paymentMethod = await this.paymentMethodRepository.update({id, isActive:true},{isActive:false});
      if ( paymentMethod.affected === 0 ) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'Payment Method not found',
        });
      }

      return paymentMethod;
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }
}
