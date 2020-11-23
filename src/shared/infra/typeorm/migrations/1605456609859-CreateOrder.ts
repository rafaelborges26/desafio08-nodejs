import { type } from "os";
import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateOrder1605456609859 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
      queryRunner.createTable(
        new Table({
          name: 'orders',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()'
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

      await queryRunner.dropTable('orders')
    }

}
