import {MigrationInterface, QueryRunner, Table, Unique} from "typeorm";

export class CreateProducts1605324483850 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.createTable(
        new Table({
          name: 'products',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()'
            },
            {
              name: 'name',
              type: 'varchar',
              isNullable: false,
              isUnique: true
            },
            {
              name: 'price',
              type: 'decimal',
              precision: 7,
              scale: 2,
              isNullable: false
            },
            {
              name: 'quantity',
              type: 'int',
              isNullable:false
            },
            {
             name: 'created_at',
             type: 'timestamp',
             default: 'now()'
            },
            {
              name: 'updated_at',
              type: 'timestamp',
              default: 'now()'
            }
          ]
      })
      )
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.dropTable('products')
    }

}
