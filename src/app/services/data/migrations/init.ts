import { MigrationInterface, QueryRunner } from "typeorm";

export class Init implements MigrationInterface {
    name: string = "Init1671880018001";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "contributor" (
          "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
          "firstname" varchar NOT NULL,
          "lastname" varchar NOT NULL
        )
      `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "contributor";`);
    }
}
