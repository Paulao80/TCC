import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createPropriedade1628856203704 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'Propriedades',
            columns: [
                {
                    name: 'PropriedadeId',
                    type: 'integer',
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'Nirf',
                    type: 'varchar',
                    isNullable: false,
                    isUnique: true
                },
                {
                    name: 'Nome',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'InscEstadual',
                    type: 'varchar',
                    isNullable: false,
                    isUnique: true
                },
                {
                    name: 'Endereco',
                    type: 'text',
                    isNullable: false
                },
                {
                    name: 'Municipio',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'Estado',
                    type: 'varchar',
                    isNullable: false
                },
                {
                    name: 'ProdutorId',
                    type: 'integer'
                }
            ],
            foreignKeys: [
                {
                    name: 'ProdutorId',
                    columnNames: ['ProdutorId'],
                    referencedTableName: 'Produtores',
                    referencedColumnNames: ['ProdutorId'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                } 
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('Propriedades');
    }

}
