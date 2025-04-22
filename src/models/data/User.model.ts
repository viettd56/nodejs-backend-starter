import { Model, Table, Column, DataType, ForeignKey, BelongsTo, Index, Unique } from 'sequelize-typescript';
import { Optional } from 'sequelize';
import moment from 'moment';
import _ from 'lodash';

type ExtraData = {};

type Info = {};

interface Attributes {
    id: string;
    info: Info;
    extra_data: ExtraData;
    google_id: string | null;
    facebook_id: string | null;
    apple_id: string | null;
    phone_number: string | null;
    email: string | null;
    name: string;
    username: string | null;
    password: string | null;
    vtv_go_id: string | null;
    appota_pay_customer_id: string | null;
}

interface CreationAttributes extends Optional<Attributes, 'id'> {}

@Table({
    defaultScope: {
        attributes: {
            exclude: ['createdAt', 'updatedAt'],
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
        defaultValue: () => {
            return moment().unix().toString() + _.random(10000, 99999);
        },
    })
    id!: string;

    @Column({ type: DataType.JSONB })
    info!: Info;

    @Column({ type: DataType.JSONB })
    extra_data!: ExtraData;

    @Unique
    @Column({ type: DataType.STRING, allowNull: true })
    google_id!: string | null;

    @Unique
    @Column({ type: DataType.STRING, allowNull: true })
    facebook_id!: string | null;

    @Unique
    @Column({ type: DataType.STRING, allowNull: true })
    apple_id!: string | null;

    @Unique
    @Column({ type: DataType.STRING, allowNull: true })
    phone_number!: string | null;

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

    @Column({ type: DataType.STRING, allowNull: true })
    password!: string | null;

    @Unique
    @Column({ type: DataType.STRING, allowNull: true })
    vtv_go_id!: string | null;

    @Unique
    @Column({ type: DataType.STRING, allowNull: true })
    appota_pay_customer_id!: string | null;
}
