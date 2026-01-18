import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';

export class MigrationTest1768778820093 implements MigrationInterface {
  //* Ejemplo cambiar nombre de una entidad (name)
  //   public async up(queryRunner: QueryRunner): Promise<void> {
  //     await queryRunner.query(
  //       'ALTER TABLE "USERS" RENAME COLUMN "name" TO "fullname"',
  //     );
  //   }
  //   public async down(queryRunner: QueryRunner): Promise<void> {
  //     await queryRunner.query(
  //       'ALTER TABLE "USERS" RENAME COLUMN "fullname" TO "name"',
  //     );
  //   }
  //* Ejemplo de cómo agregar un usuario ADMINISTRADOR nuevo a la BBDD
  //   public async up(queryRunner: QueryRunner): Promise<void> {
  //     // Hasheamos la contraseña antes de insertarla:
  //     const passwordHash = await bcrypt.hash('aaBB33##', 10);
  //     await queryRunner.query(
  //       `
  // 				INSERT INTO "USERS" ("name", "email", "password", "address", "phone", "country", "city", "isAdmin")
  // 				VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
  // 			`,
  //       [
  //         'TestUser',
  //         'testuser@mail.com',
  //         passwordHash,
  //         'Demo 1234',
  //         5556666,
  //         'Demo',
  //         'Demo',
  //         true,
  //       ],
  //     );
  //   }
  //   public async down(queryRunner: QueryRunner): Promise<void> {
  //     await queryRunner.query(`DELETE FROM "USERS" WHERE "email" = $1`, [
  //       'testuser@mail.com',
  //     ]);
  //   }
}
