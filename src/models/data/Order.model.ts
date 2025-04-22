import { Model, Table, Column, DataType, ForeignKey, BelongsTo, Index, Unique } from 'sequelize-typescript';
import { Optional } from 'sequelize';
import moment from 'moment';
import _ from 'lodash';

type ExtraData = {
    interval_count: number;
    return_url: string;
    notify_url: string;
};

type OrderStatus = 'pending' | 'success' | 'failed';

type Provider = 'momo' | 'appota_pay';

type OrderType = 'subscription' | 'in_app';

interface Attributes {
    id: string;
    user_id: string;
    verify_id: string;
    amount: number;
    status: OrderStatus;
    bundle_id: string;
    provider: Provider;
    order_type: OrderType;
    extra_data: ExtraData;
    order_date: Date;
    web_link?: string;
    app_link?: string;
    appota_pay_plan_id?: string;
    subscription_from_date?: Date;
    subscription_to_date?: Date;
    transaction_id?: string;
}

interface CreationAttributes extends Attributes {}

@Table({
    defaultScope: {
        attributes: {
            exclude: ['created_at', 'updated_at'],
        },
    },
    timestamps: true,
    schema: 'data',
    underscored: true,
    modelName: 'orders',
    paranoid: true,
})
export class OrderModel extends Model<Attributes, CreationAttributes> implements Attributes {
    @Column({
        type: DataType.STRING,
        primaryKey: true,
    })
    id!: string;

    @Column({ type: DataType.STRING, allowNull: false })
    user_id!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    verify_id!: string;

    @Column({ type: DataType.FLOAT, allowNull: false })
    amount!: number;

    @Column({ type: DataType.STRING, allowNull: false })
    status!: OrderStatus;

    @Column({ type: DataType.STRING, allowNull: false })
    bundle_id!: string;

    @Column({ type: DataType.STRING, allowNull: false })
    provider!: Provider;

    @Column({ type: DataType.STRING, allowNull: false })
    order_type!: OrderType;

    @Column({ type: DataType.JSONB, allowNull: false })
    extra_data!: ExtraData;

    @Column({ type: DataType.DATE, allowNull: false })
    order_date!: Date;

    @Column({ type: DataType.STRING, allowNull: true })
    web_link?: string;

    @Column({ type: DataType.STRING, allowNull: true })
    app_link?: string;

    @Column({ type: DataType.STRING, allowNull: true })
    appota_pay_plan_id?: string;

    @Column({ type: DataType.DATE, allowNull: true })
    subscription_from_date?: Date;

    @Column({ type: DataType.DATE, allowNull: true })
    subscription_to_date?: Date;

    @Column({ type: DataType.STRING, allowNull: true, unique: true })
    transaction_id?: string;
}
