import axios from 'axios';
import { appotaPayConfig } from 'src/configs/AppotaPay.config';
import { momoConfig } from 'src/configs/MoMo.config';
import { momoHelper } from './MoMo.helper';
import moment from 'moment';
import { NewPaymentTransaction } from './types/newPaymentTransaction';
import { GetPaymentTransaction } from './types/getPaymentTransaction';

const MoMoService = () => {
    const { MOMO_ACCESS_KEY, MOMO_PARTNER_CODE, MOMO_SECRET_KEY, MOMO_API_URL } = momoConfig;

    const newPaymentTransaction = async ({
        order_id,
        amount,
        verify_id,
        requestType,
    }: {
        order_id: string;
        amount: number;
        verify_id: string;
        requestType: 'payWithATM' | 'captureWallet' | 'payWithCC' | 'initiate';
    }) => {
        const requestData = {
            partnerCode: MOMO_PARTNER_CODE,
            requestId: moment().valueOf() + '',
            amount,
            orderId: order_id,
            orderInfo: 'orderInfo',
            redirectUrl: `https://google.com?i=redirectUrl&verify_id=${verify_id}`,
            ipnUrl: `https://google.com?i=ipnUrl&verify_id=${verify_id}`,
            requestType,
            extraData: '',
        };
        const signature = momoHelper.createSign({
            ...requestData,
            accessKey: MOMO_ACCESS_KEY,
        });
        const res = await axios.post(
            `/v2/gateway/api/create`,
            {
                ...requestData,
                lang: 'vi',
                signature,
            },
            {
                baseURL: MOMO_API_URL,
                headers: {
                    'Content-Type': 'application/json',
                },
                validateStatus: () => true,
                timeout: 60000,
            }
        );

        const data = res.data as NewPaymentTransaction;
        if (data.resultCode) {
            throw new Error(data.message);
        }
        console.log('🚀 ~ MoMoService ~ data:', data);

        return data;
    };

    const newSubscription = async ({
        order_id,
        amount,
        verify_id,
        interval_count,
    }: {
        order_id: string;
        amount: number;
        verify_id: string;
        interval_count: number;
    }) => {
        const requestData = {
            partnerCode: MOMO_PARTNER_CODE,
            requestId: moment().valueOf() + '',
            amount: '0',
            orderId: order_id,
            orderInfo: 'orderInfo',
            redirectUrl: `https://google.com?i=redirectUrl&verify_id=${verify_id}`,
            ipnUrl: `https://google.com?i=ipnUrl&verify_id=${verify_id}`,
            requestType: 'subscription',
            extraData: '',
            partnerClientId: 'user123456',
        };
        const signature = momoHelper.createSign({
            ...requestData,
            accessKey: MOMO_ACCESS_KEY,
        });
        console.log('🚀 ~ MoMoService ~ body:', {
            ...requestData,
            lang: 'vi',
            signature,
            subscriptionInfo: {
                partnerSubsId: 'SubId-1645170503079',
                name: 'Goi ABC Premium 1645170503079',
                subsOwner: 'Owner A',
                type: 'FIXED',
                recurringAmount: amount,
                nextPaymentDate: '2022-02-22',
                expiryDate: '2023-02-22',
                frequency: 'MONTHLY',
            },
        });
        const res = await axios.post(
            `/v2/gateway/api/create`,
            {
                ...requestData,
                lang: 'vi',
                signature,
                subscriptionInfo: {
                    partnerSubsId: 'SubId-1645170503079',
                    name: 'Goi ABC Premium 1645170503079',
                    subsOwner: 'Owner A',
                    type: 'FIXED',
                    recurringAmount: amount,
                    nextPaymentDate: '2022-02-22',
                    expiryDate: '2023-02-22',
                    frequency: 'MONTHLY',
                },
            },
            {
                baseURL: MOMO_API_URL,
                headers: {
                    'Content-Type': 'application/json',
                },
                validateStatus: () => true,
                timeout: 60000,
            }
        );

        const data = res.data as NewPaymentTransaction;
        if (data.resultCode) {
            throw new Error(data.message);
        }
        console.log('🚀 ~ MoMoService ~ data:', data);

        return data;
    };

    const getPaymentTransaction = async ({ order_id }: { order_id: string }) => {
        const requestData = {
            partnerCode: MOMO_PARTNER_CODE,
            requestId: moment().valueOf() + '',
            orderId: order_id,
        };
        const signature = momoHelper.createSign({
            ...requestData,
            accessKey: MOMO_ACCESS_KEY,
        });
        const res = await axios.post(
            `/v2/gateway/api/query`,
            {
                ...requestData,
                lang: 'vi',
                signature,
            },
            {
                baseURL: MOMO_API_URL,
                headers: {
                    'Content-Type': 'application/json',
                },
                validateStatus: () => true,
                timeout: 60000,
            }
        );

        const data = res.data as GetPaymentTransaction;
        if (data.resultCode) {
            throw new Error(data.message);
        }
        console.log('🚀 ~ MoMoService ~ data:', data);

        return data;
    };

    return { newPaymentTransaction, getPaymentTransaction, newSubscription };
};

export const momoService = MoMoService();
