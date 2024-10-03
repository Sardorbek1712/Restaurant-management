import { Model } from "sequelize";
import { Column, DataType, ForeignKey, Table } from "sequelize-typescript";
import { Category } from "src/modules/category";

@Table({tableName: 'foods', timestamps: true})
export class Food extends Model{
    @Column({type: DataType.BIGINT, primaryKey: true, autoIncrement: true})
    id: number;

    @Column({type: DataType.TEXT, allowNull: false, unique: true})
    name: string;

    @Column({ type: DataType.INTEGER, allowNull: false})
    price: number;

    @Column({ type: DataType.TEXT, allowNull: false })
    image: string;

    @ForeignKey(() => Category)
    @Column({ type: DataType.BIGINT, allowNull: false, onDelete: "CASCADE", onUpdate: "NO ACTION"})
    category_id: number;
}
