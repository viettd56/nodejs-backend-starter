import _ from 'lodash';
import jwt from 'jsonwebtoken';
import moment from 'moment-timezone';
import { appotaPayConfig } from 'src/configs/AppotaPay.config';
import { Exception } from 'src/exceptions/Exception';
import qs from 'qs';
import crypto from 'crypto';
import { cryptoHelper } from 'src/helpers/Crypto.helper';
import { momoConfig } from 'src/configs/MoMo.config';

export const MoMoHelper = () => {
    const { MOMO_ACCESS_KEY, MOMO_API_URL, MOMO_PARTNER_CODE, MOMO_SECRET_KEY } = momoConfig;

    const createSign = (obj: { [k: string]: string | number }) => {
        const keys = Object.keys(obj);
        const sortedKeys = _.sortBy(keys);
        const sortedObj: { [k: string]: string | number | undefined } = {};
        _.map(sortedKeys, (key) => {
            sortedObj[key] = obj[key];
        });
        const str = qs.stringify(sortedObj, { encode: false });
        console.log('🚀 ~ createSign ~ str:', str);
        return crypto.createHmac('sha256', MOMO_SECRET_KEY).update(str).digest().toString('hex');
    };

    return { createSign };
};

export const momoHelper = MoMoHelper();
