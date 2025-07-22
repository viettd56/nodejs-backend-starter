import { Model, Table, Column, DataType, ForeignKey, BelongsTo, Index, Unique } from 'sequelize-typescript';
import { Optional } from 'sequelize';
import _ from 'lodash';
import { uuidv7 } from 'uuidv7';

type ExtraData = {};

interface Attributes {
    id: string;
    extra_data: ExtraData;
    email: string | null;
    name: string;
    username: string | null;
    password: string;
}

interface CreationAttributes extends Optional<Attributes, 'id'> {}

@Table({
    defaultScope: {
        attributes: {
            exclude: ['created_at', 'updated_at'],
        },
    },
    timestamps: true,
    schema: 'data',
    underscored: true,
    modelName: 'users',
    paranoid: true,
})
export class UserModel extends Model<Attributes, CreationAttributes> implements Attributes {
    @Column({
        type: DataType.STRING,
        primaryKey: true,
        defaultValue: () => uuidv7(),
    })
    declare id: string;

    @Column({ type: DataType.JSONB })
    extra_data!: ExtraData;

    @Unique
    @Column({ type: DataType.STRING, allowNull: true })
    email!: string | null;

    @Column({ type: DataType.STRING, allowNull: true })
    name!: string;

    @Unique
    @Column({
        type: DataType.STRING,
        allowNull: true,
        validate: {
            len: [5, 30],
        },
    })
    username!: string | null;

    @Column({ type: DataType.STRING, allowNull: false })
    password!: string;
}
