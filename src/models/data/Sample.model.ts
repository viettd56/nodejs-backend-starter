import { Model, Table, Column, DataType, ForeignKey, BelongsTo, Index, Unique } from 'sequelize-typescript';
import { Optional } from 'sequelize';
import moment from 'moment-timezone';
import _ from 'lodash';

type ExtraData = {};

interface Attributes {
    id: string;
    extra_data: ExtraData;
    name: string;
}

interface CreationAttributes extends Optional<Attributes, 'id'> {}

@Table({
    defaultScope: {
        attributes: {
            exclude: ['created_at', 'updated_at'],
        },
    },
    timestamps: true,
    underscored: true,
    modelName: 'samples',
    paranoid: true,
})
export class SampleModel extends Model<Attributes, CreationAttributes> implements Attributes {
    @Column({
        type: DataType.STRING,
        primaryKey: true,
        defaultValue: () => {
            return 'U' + moment().unix().toString() + _.random(10000, 99999);
        },
    })
    declare id: string;

    @Column({ type: DataType.JSONB })
    extra_data!: ExtraData;

    @Column({ type: DataType.STRING, allowNull: true })
    name!: string;
}
