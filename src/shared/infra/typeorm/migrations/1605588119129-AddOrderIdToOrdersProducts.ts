import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddOrderIdToOrdersProducts1605588119129 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.addColumn(
        'orders_products',
        new TableColumn({
          name: 'order_id',
          type: 'uuid',
          isNullable: true
        })
      )

      await queryRunner.createForeignKey(
        'orders_products',
      new TableForeignKey({
      name: 'orders_productsOrders',
      referencedTableName: 'orders',
      referencedColumnNames: ['id'],
      columnNames: ['order_id'],
      onDelete: 'SET NULL',
      })
      )
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.dropForeignKey('orders_products', 'orders_productsOrders')

      await queryRunner.dropColumn('orders_products', 'order_id')
    }

}
