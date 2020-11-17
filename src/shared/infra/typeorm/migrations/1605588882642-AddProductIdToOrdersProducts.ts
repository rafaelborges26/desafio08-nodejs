import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddProductIdToOrdersProducts1605588882642 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.addColumn(
        'orders_products',
        new TableColumn({
          name: 'product_id',
          type: 'uuid',
          isNullable: true
        })
      )

      await queryRunner.createForeignKey(
        'orders_products',
      new TableForeignKey({
      name: 'orders_productsProducts',
      referencedTableName: 'products',
      referencedColumnNames: ['id'],
      columnNames: ['product_id'],
      onDelete: 'SET NULL',
      })
      )
    }


    public async down(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.dropForeignKey('orders_products', 'orders_productsProducts')

      await queryRunner.dropColumn('orders_products', 'product_id')
    }

}
