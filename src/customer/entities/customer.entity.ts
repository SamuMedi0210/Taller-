import { BaseEntity } from "./../../common/config/base.entity";
import { PurchasesEntity } from "./../../purchases/entities/purchase.entity";
import { Column, Entity, OneToMany } from "typeorm";

    @Entity('customer')
export class CustomerEntity extends BaseEntity {
    @Column({type: 'varchar'})
    name: string;

    @Column({type: 'varchar'})
    contact: string;
    
    @Column({type: 'varchar'})
    address: string;

    @Column({type: 'varchar'})
    city: string;

    @Column({type: 'int', default: 0, nullable:true})
    postalCode?: number = 0;

    @Column({type: 'varchar'})
    country: string;

    @OneToMany(()=>PurchasesEntity, (purchases)=>purchases.customer)
    purchases: PurchasesEntity[];
}

