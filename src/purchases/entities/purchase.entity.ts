import { BaseEntity } from "./../../common/config/base.entity";
import { PurchaseStatus } from "./../../common/enums/purchase-status.enum";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { PaymentMethodEntity } from './../../payment-methods/entities/payment-method.entity';
import { CustomerEntity } from "./../../customer/entities/customer.entity";

@Entity('Purchases')
export class PurchasesEntity extends BaseEntity {
    

    @Column({type: 'varchar'})
    status: PurchaseStatus;

    @ManyToOne(()=> PaymentMethodEntity, (paymentMethod)=>paymentMethod.purchases)
    @JoinColumn({name:'paymentMethod_id'})
    paymentMethod: string;

    @ManyToOne(()=> CustomerEntity, (customer)=>customer.purchases)
    @JoinColumn({name:'customer_id'})
    customer: string;

   
}

