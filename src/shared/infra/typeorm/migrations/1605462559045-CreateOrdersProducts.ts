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
              name: 'product_id',
              type: 'uuid',
            },
            {
              name: 'order_id',
              type: 'uuid'
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
          foreignKeys: [
            {
              name: 'orders_productsProducts',
              referencedTableName: 'products',
              referencedColumnNames: ['id'],
              columnNames: ['product_id'],
              onDelete: 'CASCADE',
              onUpdate: 'CASCADE',
            },
            {
              name: 'orders_productsOrders',
              referencedTableName: 'order',
              referencedColumnNames: ['id'],
              columnNames: ['order_id'],
              onDelete: 'CASCADE',
              onUpdate: 'CASCADE',
            }
          ]
        })
      )
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
      queryRunner.dropTable('orders_products')
    }

}
