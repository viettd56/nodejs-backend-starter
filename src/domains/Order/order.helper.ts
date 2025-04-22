import _ from 'lodash';
import moment from 'moment';
import { Exception } from 'src/exceptions/Exception';
import { OtherHelper } from 'src/helpers/Other.helper';
import { OrderModel } from 'src/models/data/Order.model';
import { appotaPayService } from '../AppotaPay/AppotaPay.service';
import { momoService } from '../MoMo/MoMo.service';
import qs from 'qs';
import crypto from 'crypto';
import { serverConfig } from 'src/configs/Server.config';

const OrderHelper = () => {
    const privateKey = Buffer.from(serverConfig.SIGN_PRIVATE_KEY, 'base64').toString('utf-8');
    const publicKey = Buffer.from(serverConfig.SIGN_PUBLIC_KEY, 'base64').toString('utf-8');
    const newProviderOrder = async ({
        bundle_type,
        provider,
        amount,
        interval_count,
        appota_pay_customer_id,
        payment_method,
    }: {
        bundle_type: string;
        provider: OrderModel['provider'];
        amount: number;
        interval_count: number;
        appota_pay_customer_id: string | null;
        payment_method?: 'ATM' | 'CC' | 'EWALLET' | 'VA' | 'MM';
    }) => {
        if (amount <= 0) {
            throw new Exception('Invalid amount');
        }
        let order_id = moment().unix().toString() + _.random(1000, 9999);
        const verify_id = OtherHelper.nanoid();
        let web_link: string | undefined;
        let app_link: string | undefined;
        let appota_pay_plan_id: string | undefined;
        if (provider === 'appota_pay') {
            order_id = order_id + 'AP';
            if (bundle_type === 'in_app') {
                const paymentResponse = await appotaPayService.newPaymentTransaction({
                    order_id: order_id.toString(),
                    amount,
                    verify_id,
                    payment_method,
                });
                web_link = paymentResponse.payment.url;
            } else if (bundle_type === 'subscription' && appota_pay_customer_id) {
                const planResponse = await appotaPayService.createPlan({
                    plan_id: order_id.toString(),
                    interval_count,
                    appota_pay_customer_id,
                    verify_id,
                    amount,
                });
                if (
                    planResponse.status === 'PENDING' &&
                    planResponse.actions[0]?.action == 'PAY' &&
                    planResponse.actions[0]?.url
                ) {
                    web_link = planResponse.actions[0].url;
                    appota_pay_plan_id = planResponse.planId;
                } else {
                    console.log('🚀 ~ OrderHelper ~ planResponse:', planResponse);
                    throw new Exception('Failed to create plan');
                }
            }
        } else if (provider === 'momo') {
            order_id = order_id + 'MM';
            if (bundle_type === 'in_app') {
                const paymentResponse = await momoService.newPaymentTransaction({
                    order_id: order_id.toString(),
                    amount,
                    verify_id,
                    requestType: 'captureWallet',
                });
                web_link = paymentResponse.payUrl;
            }
        } else {
            throw new Exception('Invalid provider');
        }

        return {
            order_id,
            verify_id,
            web_link,
            app_link,
            appota_pay_plan_id,
        };
    };

    const createSign = (obj: { [k: string]: string | number }) => {
        const keys = Object.keys(obj);
        const sortedKeys = _.sortBy(keys);
        const sortedObj: { [k: string]: string | number | undefined } = {};
        _.map(sortedKeys, (key) => {
            sortedObj[key] = obj[key];
        });
        const str = qs.stringify(sortedObj, { encode: false });
        // console.log('🚀 ~ verifySign ~ str:', str);
        return crypto.createSign('SHA256').update(str).sign(privateKey, 'base64');
    };

    const verifySign = (message: string, sign: string) => {
        return crypto.createVerify('SHA256').update(message).verify(publicKey, sign, 'base64');
    };

    return {
        newProviderOrder,
        createSign,
        verifySign,
    };
};

export const orderHelper = OrderHelper();
