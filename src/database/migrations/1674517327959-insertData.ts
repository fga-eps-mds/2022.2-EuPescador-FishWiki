import { MigrationInterface, QueryRunner } from 'typeorm';
import { readFileSync } from 'fs';

const sql = readFileSync('./src/database/migrations/fishData.sql', 'utf8');

export default class insertData1674517327959 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(sql);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM "fishWiki"');
  }
}
