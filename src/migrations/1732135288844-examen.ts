import { MigrationInterface, QueryRunner } from "typeorm";

export class Examen1732135288844 implements MigrationInterface {
    name = 'Examen1732135288844'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "paymentMethod" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "is_active" boolean NOT NULL DEFAULT true, "payment_method" character varying NOT NULL, CONSTRAINT "PK_bc8aad15eec6d1914a58089008f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Purchases" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "is_active" boolean NOT NULL DEFAULT true, "status" character varying NOT NULL, "paymentMethod_id" uuid, CONSTRAINT "PK_00390719c1ac6a45d5c161d4d51" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Purchases" ADD CONSTRAINT "FK_a38afb3f8d313ffeed3017ddab0" FOREIGN KEY ("paymentMethod_id") REFERENCES "paymentMethod"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Purchases" DROP CONSTRAINT "FK_a38afb3f8d313ffeed3017ddab0"`);
        await queryRunner.query(`DROP TABLE "Purchases"`);
        await queryRunner.query(`DROP TABLE "paymentMethod"`);
    }

}
