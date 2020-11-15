import { type } from "os";
import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateOrder1605456609859 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
      queryRunner.createTable(
        new Table({
          name: 'order',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()'
            },
            {
              name: 'customer_id',
              type: 'uuid',
              isNullable: true
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


      await queryRunner.createForeignKey('order', new TableForeignKey({
        name: 'OrderCustomer', //name da FK
        columnNames: ['customer_id'], //campo nessa tabela
        referencedColumnNames: ['id'], //campo da outra tabela
        referencedTableName: 'customers', //nome da outra tabela
        onDelete: 'SET NULL',  //restricted, não deixa o user ser apagado. - set null, seta o campo como null - cascade: deletou o usuario deleta todos os agendamentos que ele ta associado
        onUpdate: 'CASCADE',
    }) )

    }

    public async down(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.dropForeignKey('order', 'OrderCustomer')

      await queryRunner.dropTable('order')
    }

}
