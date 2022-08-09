import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { FlightRequestStatusEnum } from "../../flightRequest/types";

export class CreateFlightRequestsTable1659993433070 implements MigrationInterface {

    constructor(private readonly tableName = 'flightRequests') {
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
                  name: 'from',
                  length: '128',
                  type: 'varchar',
                },
                {
                  name: 'to',
                  length: '128',
                  type: 'varchar',
                },
                {
                  name: 'takeoff_date',
                  type: 'timestamptz',
                },
                {
                  name: 'landing_date',
                  type: 'timestamptz',
                },
                {
                  name: 'status',
                  type: 'varchar',
                  isNullable: false,
                },
                {
                  name: 'related_flight_request_id',
                  type: 'int',
                  isNullable: true
                },
                {
                  name: 'submitted_by',
                  type: 'int',
                  isNullable: true
                },
                {
                  name: 'edited_by',
                  type: 'int',
                  isNullable: true
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
                name                 : 'submitted_by_FK',
                columnNames          : ['submitted_by'],
                referencedColumnNames: ['id'],
                referencedTableName  : 'users',
                onDelete             : 'cascade',
                onUpdate             : 'cascade',
              },
              {
                name                 : 'edited_by_FK',
                columnNames          : ['edited_by'],
                referencedColumnNames: ['id'],
                referencedTableName  : 'users',
                onDelete             : 'cascade',
                onUpdate             : 'cascade',
              },
              {
                name                 : 'related_flight_request_id_FK',
                columnNames          : ['related_flight_request_id'],
                referencedColumnNames: ['id'],
                referencedTableName  : this.tableName,
                onDelete             : 'cascade',
                onUpdate             : 'cascade',
              },
            ],
          }),
          true
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable(this.tableName, true)
    }

}
