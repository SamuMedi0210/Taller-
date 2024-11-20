import { BaseEntity } from "./../../common/config/base.entity";
import { PurchasesEntity } from "./../../purchases/entities/purchase.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";


@Entity('paymentMethod')
export class PaymentMethodEntity extends BaseEntity {
    
    @Column({type: 'varchar'})
    paymentMethod: string;

    @OneToMany(()=>PurchasesEntity, (purchases)=>purchases.paymentMethod)
    purchases: PurchasesEntity[];
}
