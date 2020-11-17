import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddCustomerIdToOrders1605587669531 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.addColumn('order',
      new TableColumn({
        name: 'customer_id',
        type: 'uuid',
        isNullable: true
      })
      )


      await queryRunner.createForeignKey('order', new TableForeignKey({
        name: 'OrderCustomer', //name da FK
        columnNames: ['customer_id'], //campo nessa tabela
        referencedColumnNames: ['id'], //campo da outra tabela
        referencedTableName: 'customers', //nome da outra tabela
        onDelete: 'SET NULL',  //restricted, não deixa o user ser apagado. - set null, seta o campo como null - cascade: deletou o usuario deleta todos os agendamentos que ele ta associado
      }) )


    }

    public async down(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.dropForeignKey('order', 'OrderCustomer')

      await queryRunner.dropColumn('order', 'customer_id')
    }

}
