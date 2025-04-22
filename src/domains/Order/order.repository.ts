import { Exception } from 'src/exceptions/Exception';
import { OrderModel } from 'src/models/data/Order.model';
import { appotaPayService } from '../AppotaPay/AppotaPay.service';
import moment from 'moment';
import _ from 'lodash';
import { OtherHelper } from 'src/helpers/Other.helper';
import { sequelize } from 'src/models/sequelize';

const OrderRepository = () => {
    const updateOrderSuccess = async (id: string) => {
        return await sequelize.transaction(async (t) => {
            const order = await OrderModel.findOne({
                where: {
                    id,
                    status: 'pending',
                },
                transaction: t,
                lock: t.LOCK.UPDATE,
            });
            if (order) {
                order.status = 'success';
                return order.save({ transaction: t });
            }
            return;
        });
    };

    const updateOrderFailed = async (id: string) => {
        await sequelize.transaction(async (t) => {
            const order = await OrderModel.findOne({
                where: {
                    id,
                    status: 'pending',
                },
                transaction: t,
                lock: t.LOCK.UPDATE,
            });
            if (order) {
                order.status = 'failed';
                await order.save({ transaction: t });
            }
            return;
        });
    };
    return {
        updateOrderSuccess,
        updateOrderFailed,
    };
};

export const orderRepository = OrderRepository();
