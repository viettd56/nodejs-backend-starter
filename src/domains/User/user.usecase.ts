import { UserModel } from 'src/models/data/User.model';
import { appotaPayService } from '../AppotaPay/AppotaPay.service';

const UserUsecase = () => {
    const getAppotaPayCustomer = async ({ user_id }: { user_id: string }) => {
        const userData = await UserModel.findOne({ where: { id: user_id } });
        if (!userData) {
            throw new Error('User not found');
        }
        if (userData.appota_pay_customer_id) {
            return userData.appota_pay_customer_id;
        }
        const customer = await appotaPayService.createCustomer({ user_id: userData.id.toString() });
        userData.appota_pay_customer_id = customer.customerId;
        await userData.save();
        return customer.customerId;
    };

    const getUserByVtvGoId = async ({ vtv_go_id }: { vtv_go_id: string }) => {
        if (!vtv_go_id) {
            throw new Error('VTV Go ID is required');
        }
        const [userData, created] = await UserModel.findOrCreate({
            where: {
                vtv_go_id,
            },
            defaults: {
                vtv_go_id,
                extra_data: {},
                info: {},
                name: '',
            },
        });
        return userData;
    };

    return {
        getAppotaPayCustomer,
        getUserByVtvGoId,
    };
};

export const userUsecase = UserUsecase();
