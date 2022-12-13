import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class createfishWiki1670709489907 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'fishWiki',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true },
          { name: 'largeGroup', type: 'varchar', isNullable: true },
          { name: 'group', type: 'varchar', isNullable: true },
          { name: 'commonName', type: 'varchar', isNullable: true },
          { name: 'scientificName', type: 'varchar', isNullable: true },
          { name: 'family', type: 'varchar', isNullable: true },
          { name: 'food', type: 'varchar', isNullable: true },
          { name: 'habitat', type: 'varchar', isNullable: true },
          { name: 'maxSize', type: 'float', isNullable: true },
          { name: 'maxWeight', type: 'float', isNullable: true },
          { name: 'isEndemicInfo', type: 'varchar', isNullable: true },
          { name: 'isEndemic', type: 'boolean', isNullable: true },
          { name: 'isThreatenedInfo', type: 'varchar', isNullable: true },
          { name: 'isThreatened', type: 'boolean', isNullable: true },
          { name: 'hasSpawningSeasonInfo', type: 'varchar', isNullable: true },
          { name: 'hasSpawningSeason', type: 'boolean', isNullable: true },
          { name: 'wasIntroducedInfo', type: 'varchar', isNullable: true },
          { name: 'wasIntroduced', type: 'boolean', isNullable: true },
          { name: 'funFact', type: 'varchar', isNullable: true },
          { name: 'photo', type: 'varchar', isNullable: true },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('fishWiki');
  }
}
