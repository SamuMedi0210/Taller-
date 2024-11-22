import { MigrationInterface, QueryRunner } from "typeorm";

export class Laboratorio1732288538840 implements MigrationInterface {
    name = 'Laboratorio1732288538840'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "customer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "is_active" boolean NOT NULL DEFAULT true, "name" character varying NOT NULL, "contact" character varying NOT NULL, "address" character varying NOT NULL, "city" character varying NOT NULL, "postal_code" integer DEFAULT '0', "country" character varying NOT NULL, CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Purchases" ADD "customer_id" uuid`);
        await queryRunner.query(`ALTER TABLE "Purchases" ADD CONSTRAINT "FK_bc1b0b0934812039cf4d4b07f8e" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Purchases" DROP CONSTRAINT "FK_bc1b0b0934812039cf4d4b07f8e"`);
        await queryRunner.query(`ALTER TABLE "Purchases" DROP COLUMN "customer_id"`);
        await queryRunner.query(`DROP TABLE "customer"`);
    }

}
