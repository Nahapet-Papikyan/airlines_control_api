import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { UserRoleEnum } from "../../users/types";

export class CreateUsersTable1659992821429 implements MigrationInterface {

    constructor(private readonly tableName = 'users') {
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
                  name: 'email',
                  length: '60',
                  type: 'varchar',
                },
                {
                  name: 'password',
                  length: '128',
                  type: 'varchar',
                  isNullable: false,
                },
                {
                  name: 'token',
                  type: 'varchar',
                  length: '500',
                  isNullable: true,
                  default: null
                },
                {
                  name: 'role',
                  type: 'varchar',
                  isNullable: false
                },
                {
                  name: 'airline_id',
                  type: 'int',
                  isNullable: true
                },
                {
                  name: 'deleted_at',
                  type: 'timestamptz',
                  default: null,
                  isNullable: true,
                },
                {
                  name: 'updated_at',
                  type: 'timestamptz',
                  isNullable: true,
                },
                {
                  name: 'created_at',
                  type: 'timestamptz',
                  default: 'now()',
                },
              ],
            foreignKeys: [
              {
                name                 : 'airline_id_FK',
                columnNames          : ['airline_id'],
                referencedColumnNames: ['id'],
                referencedTableName  : 'airlines',
                onDelete             : 'cascade',
                onUpdate             : 'cascade',
              }
            ],
          }),
          true
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable(this.tableName, true)
    }

}
