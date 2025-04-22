import axios from 'axios';
import { appotaPayConfig } from 'src/configs/AppotaPay.config';
import { appotaPayHelper } from './AppotaPay.helper';
import { GetPaymentTransaction } from './types/getPaymentTransaction';
import { NewPaymentResponse } from './types/newPayment';
import { NewCustomerResponse } from './types/newCustomer';
import { NewPlanResponse } from './types/newPlan';
import { GetPlanCyclesResponse } from './types/getPlanCycles';

const AppotaPayService = () => {
    const {
        APPOTA_PAY_GATEWAY_URL,
        APPOTA_PAY_API_KEY,
        APPOTA_PAY_SECRET_KEY,
        APPOTA_PAY_PARTNER_CODE,
        APPOTA_PAY_OUT_IP,
        APPOTA_PAY_CALLBACK_URL,
    } = appotaPayConfig;

    const getPaymentTransaction = async ({ order_id }: { order_id: string }) => {
        const res = await axios.get(`/api/v2/orders/transaction`, {
            baseURL: APPOTA_PAY_GATEWAY_URL,
            headers: {
                'Content-Type': 'application/json',
                'X-APPOTAPAY-AUTH': `Bearer ${appotaPayHelper.createJwtToken()}`,
            },
            validateStatus: () => true,
            params: {
                referenceId: order_id,
                type: 'PARTNER_ORDER_ID',
            },
        });

        const data = res.data as GetPaymentTransaction;

        if (data.errorCode) {
            throw new Error(data.message);
        }

        return data;
    };

    const newPaymentTransaction = async ({
        order_id,
        amount,
        verify_id,
        payment_method,
    }: {
        order_id: string;
        amount: number;
        verify_id: string;
        payment_method?: 'ATM' | 'CC' | 'EWALLET' | 'VA' | 'MM';
    }) => {
        if (amount <= 0) {
            throw new Error('Amount must be greater than 0');
        }
        const res = await axios.post(
            `/api/v2/orders/payment`,
            {
                transaction: {
                    amount,
                    currency: 'VND',
                    paymentMethod: payment_method ?? 'ATM',
                    action: 'PAY',
                },
                partnerReference: {
                    order: {
                        id: order_id,
                        info: '1',
                        extraData: '',
                    },
                    notificationConfig: {
                        notifyUrl: `${APPOTA_PAY_CALLBACK_URL}?verify_id=${verify_id}`,
                        redirectUrl: `${APPOTA_PAY_CALLBACK_URL}?verify_id=${verify_id}`,
                        // deeplinkUrl: 'https://google.com',
                    },
                },
            },
            {
                baseURL: APPOTA_PAY_GATEWAY_URL,
                headers: {
                    'Content-Type': 'application/json',
                    'X-APPOTAPAY-AUTH': `Bearer ${appotaPayHelper.createJwtToken()}`,
                },
                validateStatus: () => true,
            }
        );

        const data = res.data as NewPaymentResponse;

        if (data.errorCode) {
            throw new Error(data.message);
        }

        return data;
    };

    const createCustomer = async ({ user_id }: { user_id: string }) => {
        const res = await axios.post(
            `/api/v1/customers`,
            {
                customerRefId: user_id,
                customer: {
                    firstName: 'User ' + user_id,
                },
            },
            {
                baseURL: APPOTA_PAY_GATEWAY_URL,
                headers: {
                    'Content-Type': 'application/json',
                    'X-APPOTAPAY-AUTH': `Bearer ${appotaPayHelper.createJwtToken()}`,
                },
                validateStatus: () => true,
            }
        );

        const data = res.data as NewCustomerResponse;

        if (data.errorCode) {
            throw new Error(data.message);
        }

        return data;
    };

    const getCustomer = async ({ user_id }: { user_id: string }) => {
        const res = await axios.get(`/api/v1/customers/${user_id}`, {
            baseURL: APPOTA_PAY_GATEWAY_URL,
            headers: {
                'Content-Type': 'application/json',
                'X-APPOTAPAY-AUTH': `Bearer ${appotaPayHelper.createJwtToken()}`,
            },
            validateStatus: () => true,
        });

        const data = res.data as NewCustomerResponse;

        if (data.errorCode) {
            throw new Error(data.message);
        }

        return data;
    };

    const createPlan = async ({
        appota_pay_customer_id,
        plan_id,
        interval_count,
        verify_id,
        amount,
    }: {
        appota_pay_customer_id: string;
        plan_id: string;
        interval_count: number;
        verify_id: string;
        amount: number;
    }) => {
        if (amount <= 0) {
            throw new Error('Amount must be greater than 0');
        }
        if (interval_count <= 0) {
            throw new Error('Interval count must be greater than 0');
        }
        const res = await axios.post(
            `/api/v1/subs/plans`,
            {
                planRefId: plan_id,
                customerId: appota_pay_customer_id,
                currency: 'VND',
                amount,
                immediateActionType: 'FULL_AMOUNT',
                failedCycleAction: 'STOP',
                country: 'VN',
                returnUrl: `${APPOTA_PAY_CALLBACK_URL}?verify_id=${verify_id}`,
                schedule: {
                    interval: 'DAY',
                    intervalCount: interval_count,
                    totalRecurrence: 3,
                    retryInterval: 'DAY',
                    retryIntervalCount: 1,
                    totalRetry: 1,
                },
            },
            {
                baseURL: APPOTA_PAY_GATEWAY_URL,
                headers: {
                    'Content-Type': 'application/json',
                    'X-APPOTAPAY-AUTH': `Bearer ${appotaPayHelper.createJwtToken()}`,
                },
                validateStatus: () => true,
            }
        );

        const data = res.data as NewPlanResponse;

        if (data.errorCode) {
            throw new Error(data.message);
        }

        return data;
    };

    const getPlanCycles = async ({ plan_id, page }: { plan_id: string; page: number }) => {
        const res = await axios.get(`/api/v1/subs/plans/${plan_id}/cycles`, {
            baseURL: APPOTA_PAY_GATEWAY_URL,
            headers: {
                'Content-Type': 'application/json',
                'X-APPOTAPAY-AUTH': `Bearer ${appotaPayHelper.createJwtToken()}`,
            },
            validateStatus: () => true,
            params: {
                page,
            },
        });

        const data = res.data as GetPlanCyclesResponse;

        if (data.errorCode) {
            throw new Error(data.message);
        }

        return data;
    };

    return { getPaymentTransaction, newPaymentTransaction, createCustomer, getCustomer, createPlan, getPlanCycles };
};

export const appotaPayService = AppotaPayService();
