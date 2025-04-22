import { Model, Table, Column, DataType, ForeignKey, BelongsTo, Index, Unique } from 'sequelize-typescript';
import { Optional } from 'sequelize';
import moment from 'moment';
import _ from 'lodash';

type ExtraData = {};

interface Attributes {
    id: number;
    order_id: string;
    from_date: Date;
    to_date: Date;
    extra_data: ExtraData;
    cycle_id: string;
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
    modelName: 'appota_pay_subscription_cycles',
    paranoid: true,
})
export class AppotaPaySubscriptionCycleModel extends Model<Attributes, CreationAttributes> implements Attributes {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    id!: number;

    @Index
    @Unique('order_cycle')
    @Column({ type: DataType.STRING, allowNull: false })
    order_id!: string;

    @Column({ type: DataType.DATE, allowNull: false })
    from_date!: Date;

    @Column({ type: DataType.DATE, allowNull: false })
    to_date!: Date;

    @Column({ type: DataType.JSONB, allowNull: false })
    extra_data!: ExtraData;

    @Unique('order_cycle')
    @Column({ type: DataType.STRING, allowNull: false })
    cycle_id!: string;
}
