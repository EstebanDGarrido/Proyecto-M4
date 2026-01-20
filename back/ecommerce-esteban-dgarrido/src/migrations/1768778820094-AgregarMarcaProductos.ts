import { MigrationInterface, QueryRunner } from 'typeorm';

export class AgregarMarcaProductos1768778820094 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "USERS" ADD COLUMN "edad" varchar');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "PRODUCTS" DROP COLUMN "marca"');
  }
}
