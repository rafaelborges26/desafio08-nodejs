import OrdersProducts from "@modules/orders/infra/typeorm/entities/OrdersProducts";
import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateOrdersProducts1605462559045 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {

      queryRunner.createTable(
        new Table({
          name: 'orders_products',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()'
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
          ],
        })
      )
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
      queryRunner.dropTable('orders_products')
    }

}
