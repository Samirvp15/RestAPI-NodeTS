import { Column, DataType, Model, Sequelize, Table } from "sequelize-typescript";
@Table({
    tableName: 'products'
})

class Product extends Model{
    @Column({
        type: DataType.STRING(100)
    })
    name: string = '';

    @Column({
        type: DataType.FLOAT
    })
    price: number = 0.0;

    @Column({
        type: DataType.BOOLEAN
    })
    avalability: boolean = false;
}
export default Product


