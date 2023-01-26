import { MigrationInterface, QueryRunner } from 'typeorm';

export default class AddColumnsCreatedAtAndUpdatedAt1674706650739
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "fishWiki" ADD "created_at" TIMESTAMP DEFAULT now()`
    );
    await queryRunner.query(
      `ALTER TABLE "fishWiki" ADD "updated_at" TIMESTAMP DEFAULT now()`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "fishWiki" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "fishWiki" DROP COLUMN "created_at"`);
  }
}
