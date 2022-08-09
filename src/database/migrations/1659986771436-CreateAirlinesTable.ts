import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAirlinesTable1659986771436 implements MigrationInterface {

    constructor(private readonly tableName = 'airlines') {
    }

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
              name: this.tableName,
              columns: [
                {
                  name: 'id',
                  type: 'bigint',
                  isPrimary: true,
                  unsigned: true,
                  isGenerated: true,
                  generationStrategy: 'increment',
                },
                {
                  name: 'name',
                  length: '60',
                  type: 'varchar',
                },
                {
                  name: 'deleted_at',
                  type: 'timestamptz',
                  default: null,
                  isNullable: true,
                },
                {
                  name: 'created_at',
                  type: 'timestamptz',
                  default: 'now()',
                },
                {
                  name: 'updated_at',
                  type: 'timestamptz',
                  isNullable: true,
                },
              ]
          }),
          true
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable(this.tableName, true)
    }

}
