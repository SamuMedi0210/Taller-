import { Injectable } from '@nestjs/common';
import { CreatePurchasesDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { PurchasesEntity } from './entities/purchase.entity';
import { PaginationDto } from 'src/common/dtos/pagination/pagination.dto';
import { ManagerError } from 'src/common/errors/manager.error';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { ResponseAllPurchases } from './interfaces/response-purchases.interface';

@Injectable()
export class PurchasesService {

  constructor(
    @InjectRepository(PurchasesEntity)
    private readonly purchasesRepository: Repository<PurchasesEntity>,
  ){}

  async create(createPurchasesDto: CreatePurchasesDto): Promise<PurchasesEntity> {
    try {
      const purchases = await this.purchasesRepository.save(createPurchasesDto);
      if( !purchases ){
        throw new ManagerError({
          type: 'CONFLICT',
          message: 'Purchase not created!',
        });
      }
      return purchases;
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async findAll(paginationDto: PaginationDto): Promise<ResponseAllPurchases> {
    const { limit, page } = paginationDto;
    const skip = (page - 1) * limit;

    try {
      const [ total, data ] = await Promise.all([
        this.purchasesRepository.count( { where: { isActive: true } } ),
        this.purchasesRepository.createQueryBuilder('purchases')
        .where({isActive: true})
        .leftJoinAndSelect('purchases.paymentMethod','paymentMethod')
        .take(limit)
        .skip(skip)
        .getMany()
      ]);

      const lastPage = Math.ceil(total / limit);

      return {
        page,
        limit,
        lastPage,
        total,
        data,
      };
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async findOne(id: string): Promise<PurchasesEntity> {
    try {
      const purchases = await this.purchasesRepository.createQueryBuilder('purchases')
      .where({id, isActive: true})
      .leftJoinAndSelect('purchases.paymentMethod','paymentMethod')
      .getOne()

      if (!purchases) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'Purchase not found!',
        })
      }

      return purchases
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }
  
  async update(id: string, updatePurchaseDto: UpdatePurchaseDto): Promise<UpdateResult> {
    try {
      const purchases = await this.purchasesRepository.update( {id, isActive: true}, updatePurchaseDto );
      if ( purchases.affected === 0 ) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'Payment Method not found!',
        })
      }

      return purchases;
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async remove(id: string): Promise<UpdateResult> {
    try {
      const purchases = await this.purchasesRepository.update({id, isActive:true},{isActive:false});
      if ( purchases.affected === 0 ) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'Payment Method not found',
        });
      }

      return purchases;
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }
}
