import _ from 'lodash';
import jwt from 'jsonwebtoken';
import moment from 'moment-timezone';
import { appotaPayConfig } from 'src/configs/AppotaPay.config';
import { Exception } from 'src/exceptions/Exception';
import qs from 'qs';
import crypto from 'crypto';
import { cryptoHelper } from 'src/helpers/Crypto.helper';

export const AppotaPayHelper = () => {
    const {
        APPOTA_PAY_OUT_IP,
        APPOTA_PAY_API_KEY,
        APPOTA_PAY_GATEWAY_URL,
        APPOTA_PAY_PARTNER_CODE,
        APPOTA_PAY_SECRET_KEY,
    } = appotaPayConfig;
    const listIps = APPOTA_PAY_OUT_IP.split(';');
    const verifyOutIP = (ip: string) => {
        if (listIps.includes(ip) !== true) {
            throw new Exception('ip invalid: ' + ip);
        }
    };

    const _listBank = [
        {
            code: 'VCB',
            name: 'Ngân hàng thương mại Cổ phần Ngoại thương Việt Nam',
            name_en: 'Joint Stock Commercial Bank for Foreign Trade of Vietnam',
            logo: 'https://s3.kstorage.vn/chainverse/chainverse/fiat-on-ramp/bank-logo/vietcombank.png',
        },
        {
            code: 'TECHCOMBANK',
            name: 'Ngân hàng thương mại Cổ phần kỹ thương Việt Nam',
            name_en: 'Vietnam Technological and Commercial Joint Stock Bank',
            logo: 'https://s3.kstorage.vn/chainverse/chainverse/fiat-on-ramp/bank-logo/techcombank.png',
        },
        {
            code: 'TPBANK',
            name: 'Ngân hàng thương mại Cổ phần Tiên Phong',
            name_en: 'Tien Phong Commercial Joint Stock Bank',
            logo: 'https://s3.kstorage.vn/chainverse/chainverse/fiat-on-ramp/bank-logo/tpbank.png',
        },
        {
            code: 'VIETINBANK',
            name: 'Ngân hàng Thương mại cổ phần Công Thương Việt Nam',
            name_en: 'Vietnam Joint Stock Commercial Bank for Industry and Trade',
            logo: 'https://s3.kstorage.vn/chainverse/chainverse/fiat-on-ramp/bank-logo/viettinbank.png',
        },
        {
            code: 'VIB',
            name: 'Ngân Hàng Quốc Tế VIB',
            name_en: 'Vietnam International Commercial Joint Stock Bank',
            logo: 'https://s3.kstorage.vn/chainverse/chainverse/fiat-on-ramp/bank-logo/vib.png',
        },
        {
            code: 'HDBANK',
            name: 'Ngân hàng thương mại cổ phần Phát triển Thành phố Hồ Chí Minh',
            name_en: 'Ho Chi Minh City Development Joint Stock Commercial Bank',
            logo: 'https://s3.kstorage.vn/chainverse/chainverse/fiat-on-ramp/bank-logo/hdbank.png',
        },
        {
            code: 'MB',
            name: 'Ngân hàng thương mại cổ phần Quân đội',
            name_en: 'Military Commercial Joint Stock Bank',
            logo: 'https://s3.kstorage.vn/chainverse/chainverse/fiat-on-ramp/bank-logo/mb.png',
        },
        {
            code: 'VIETABANK',
            name: 'Ngân hàng thương mại CP Việt Á',
            name_en: 'Vietnam Asia Commercial Joint Stock Bank',
            logo: 'https://s3.kstorage.vn/chainverse/chainverse/fiat-on-ramp/bank-logo/vietabank.png',
        },
        {
            code: 'MARITIMEBANK',
            name: 'Ngân hàng thương mại cổ phần Hàng hải Việt Nam',
            name_en: 'Maritime Commercial Joint Stock Bank',
            logo: 'https://s3.kstorage.vn/chainverse/chainverse/fiat-on-ramp/bank-logo/maritimebank.png',
        },
        {
            code: 'EXIMBANK',
            name: 'Ngân hàng thương mại cổ phần Xuất Nhập Khẩu Việt Nam',
            name_en: 'Vietnam Export Import Commercial Joint Stock Bank',
            logo: 'https://s3.kstorage.vn/chainverse/chainverse/fiat-on-ramp/bank-logo/eximbank.png',
        },
        {
            code: 'SCB',
            name: 'Ngân hàng TMCP Sài Gòn',
            name_en: 'Sai Gon Joint Stock Commercial Bank',
            logo: 'https://s3.kstorage.vn/chainverse/chainverse/fiat-on-ramp/bank-logo/scb.png',
        },
        {
            code: 'VPBANK',
            name: 'Ngân hàng TMCP Việt Nam Thịnh Vượng',
            name_en: 'Vietnam Prosperity Joint Stock Commercial Bank',
            logo: 'https://s3.kstorage.vn/chainverse/chainverse/fiat-on-ramp/bank-logo/vpbank.png',
        },
        {
            code: 'ABBANK',
            name: 'Ngân hàng Thương mại Cổ phần An Bình',
            name_en: 'An Binh Commercial Joint Stock Bank',
            logo: 'https://s3.kstorage.vn/chainverse/chainverse/fiat-on-ramp/bank-logo/abbank.png',
        },
        {
            code: 'SACOMBANK',
            name: 'Ngân hàng thương mại cổ phần Sài Gòn Thương Tín',
            name_en: 'Sai Gon Thuong Tin Commercial Joint Stock Bank',
            logo: 'https://s3.kstorage.vn/chainverse/chainverse/fiat-on-ramp/bank-logo/sacombank.png',
        },
        {
            code: 'OCEANBANK',
            name: 'Ngân hàng Đại Dương',
            name_en: 'Ocean Commercial One Member Limited Liability Bank',
            logo: 'https://s3.kstorage.vn/chainverse/chainverse/fiat-on-ramp/bank-logo/oceanbank.png',
        },
        {
            code: 'BIDV',
            name: 'Ngân hàng Đầu tư và Phát triển Việt Nam',
            name_en: 'Bank for Investment and Development of Vietnam',
            logo: 'https://s3.kstorage.vn/chainverse/chainverse/fiat-on-ramp/bank-logo/bidv.png',
        },
        {
            code: 'SEABANK',
            name: 'Ngân hàng TMCP Đông Nam Á',
            name_en: 'Southeast Asia Commercial Joint Stock Bank',
            logo: 'https://s3.kstorage.vn/chainverse/chainverse/fiat-on-ramp/bank-logo/seabank.png',
        },
        {
            code: 'BACA',
            name: 'Bắc Á Bank',
            name_en: 'Bac A Commercial Joint Stock Bank',
            logo: 'https://s3.kstorage.vn/chainverse/chainverse/fiat-on-ramp/bank-logo/bacabank.png',
        },
        {
            code: 'AGRIBANK',
            name: 'Ngân hàng Nông nghiệp và Phát triển Nông thôn Việt Nam',
            name_en: 'Vietnam Bank for Agriculture and Rural Development',
            logo: 'https://s3.kstorage.vn/chainverse/chainverse/fiat-on-ramp/bank-logo/agribank.png',
        },
        {
            code: 'SAIGONBANK',
            name: 'Ngân hàng thương mại cổ phần Sài Gòn Công Thương',
            name_en: 'Saigon Bank for Industry and Trade',
            logo: 'https://s3.kstorage.vn/chainverse/chainverse/fiat-on-ramp/bank-logo/saigonbank.png',
        },
        {
            code: 'PVBANK',
            name: 'Ngân hàng TMCP Đại Chúng Việt Nam',
            name_en: 'Vietnam Public Joint Stock Commercial Bank',
            logo: 'https://s3.kstorage.vn/chainverse/chainverse/fiat-on-ramp/bank-logo/pvcombank.png',
        },
        {
            code: 'ACB',
            name: 'Ngân hàng thương mại cổ phần Á Châu',
            name_en: 'Asia Commercial Bank',
            logo: 'https://s3.kstorage.vn/chainverse/chainverse/fiat-on-ramp/bank-logo/acb.png',
        },
        {
            code: 'BVBANK',
            name: 'Ngân hàng TMCP Bảo Việt',
            name_en: 'Baoviet Joint Stock Commercial Bank',
            logo: 'https://s3.kstorage.vn/chainverse/chainverse/fiat-on-ramp/bank-logo/baovietbank.png',
        },
        {
            code: 'GPBANK',
            name: 'Ngân hàng TMCP Dầu Khí Toàn Cầu',
            name_en: 'Global Petro Sole Member Limited Commercial Bank',
            logo: 'https://s3.kstorage.vn/chainverse/chainverse/fiat-on-ramp/bank-logo/gpbank.png',
        },
        {
            code: 'LPB',
            name: 'Ngân hàng thương mại cổ phần Bưu điện Liên Việt',
            name_en: 'Lien Viet Post Joint Stock Commercial Bank',
            logo: 'https://s3.kstorage.vn/chainverse/chainverse/fiat-on-ramp/bank-logo/lienvietpostbank.png',
        },
        {
            code: 'NCB',
            name: 'Ngân hàng Thương mại Cổ phần Quốc Dân',
            name_en: 'National Citizen Commercial Joint Stock Bank',
            logo: 'https://s3.kstorage.vn/chainverse/chainverse/fiat-on-ramp/bank-logo/ncb.png',
        },
        {
            code: 'HONGLEONG',
            name: 'Ngân hàng TNHH MTV Hongleong Việt Nam',
            name_en: 'Hong Leong Bank Berhad (Vietnam)',
            logo: 'https://s3.kstorage.vn/chainverse/chainverse/fiat-on-ramp/bank-logo/hongleongbank.png',
        },
        {
            code: 'PBVN',
            name: 'Ngân hàng Public Bank',
            name_en: 'Public Bank Vietnam Limited',
            logo: 'https://s3.kstorage.vn/chainverse/chainverse/fiat-on-ramp/bank-logo/public-bank.png',
        },
        {
            code: 'OCB',
            name: 'Ngân hàng TMCP Phương Đông',
            name_en: 'OCEAN Commercial Joint Stock Bank',
            logo: 'https://s3.kstorage.vn/chainverse/chainverse/fiat-on-ramp/bank-logo/ocb.png',
        },
        {
            code: 'SHB',
            name: 'Ngân hàng TMCP Sài Gòn - Hà Nội',
            name_en: 'Saigon-Hanoi Commercial Joint Stock Bank',
            logo: 'https://s3.kstorage.vn/chainverse/chainverse/fiat-on-ramp/bank-logo/shb.png',
        },
        {
            code: 'SHINHAN',
            name: 'Ngân hàng TNHH MTV Shinhan Việt Nam',
            name_en: 'Shinhan Bank Co., Ltd. (Vietnam)',
            logo: 'https://s3.kstorage.vn/chainverse/chainverse/fiat-on-ramp/bank-logo/shinhan.png',
        },
        {
            code: 'VIETBANK',
            name: 'Ngân hàng TMCP Việt Nam Thương Tín',
            name_en: 'Vietnam Thuong Tin Commercial Joint Stock Bank',
            logo: 'https://s3.kstorage.vn/chainverse/chainverse/fiat-on-ramp/bank-logo/vietbank.png',
        },
        {
            code: 'VIETCAPITALBANK',
            name: 'Ngân hàng TMCP Bản Việt',
            name_en: 'Viet Capital Commercial Joint Stock Bank',
            logo: 'https://s3.kstorage.vn/chainverse/chainverse/fiat-on-ramp/bank-logo/vietcapitalbank.png',
        },
        {
            code: 'KIENLONGBANK',
            name: 'Ngân hàng TMCP Kiên Long',
            name_en: 'Kien Long Commercial Joint - Stock Bank',
            logo: 'https://s3.kstorage.vn/chainverse/chainverse/fiat-on-ramp/bank-logo/kienlongbank.png',
        },
        {
            code: 'PGBANK',
            name: 'Ngân hàng TMCP Xăng Dầu Petrolimex',
            name_en: 'Petrolimex Group Commercial Joint Stock Bank',
            logo: 'https://s3.kstorage.vn/chainverse/chainverse/fiat-on-ramp/bank-logo/pgbank.png',
        },
        {
            code: 'VRB',
            name: 'Ngân hàng Liên Doanh Việt Nga',
            name_en: 'Vietnam - Russia Joint Venture Bank',
            logo: 'https://s3.kstorage.vn/chainverse/chainverse/fiat-on-ramp/bank-logo/vrb.png',
        },
        {
            code: 'NAMABANK',
            name: 'Ngân hàng TMCP Nam Á',
            name_en: 'Nam A comercial Join Stock Bank',
            logo: 'https://s3.kstorage.vn/chainverse/chainverse/fiat-on-ramp/bank-logo/nama.png',
        },
        {
            code: 'IVB',
            name: 'Ngân hàng TNHH Indovina',
            name_en: 'Indovina Bank Ltd',
            logo: 'https://s3.kstorage.vn/chainverse/chainverse/fiat-on-ramp/bank-logo/ivb.png',
        },
        {
            code: 'WOORIBANK',
            name: 'Ngân hàng Wooribank',
            name_en: 'Woori Bank Vietnam Limited',
            logo: 'https://s3.kstorage.vn/chainverse/chainverse/fiat-on-ramp/bank-logo/worribank.png',
        },
        {
            code: 'UOB',
            name: 'Ngân hàng TNHH MTV United Overseas Bank',
            name_en: 'United Overseas Bank (Vietnam) Limited',
            logo: 'https://s3.kstorage.vn/chainverse/chainverse/fiat-on-ramp/bank-logo/uob.png',
        },
        {
            code: 'COOPBANK',
            name: 'Ngân hàng hợp tác Co-opBank',
            name_en: 'Co-operative Bank of Vietnam',
            logo: 'https://s3.kstorage.vn/chainverse/chainverse/fiat-on-ramp/bank-logo/coopbank.png',
        },
        {
            code: 'CIMB',
            name: 'Ngân hàng CIMB Việt Nam',
            name_en: 'CIMB Bank Vietnam Limited',
            logo: 'https://s3.kstorage.vn/chainverse/chainverse/fiat-on-ramp/bank-logo/cimb.png',
        },
        {
            code: 'IBK',
            name: 'Ngân Hàng Công Nghiệp Hàn Quốc',
            name_en: 'Industrial Bank of Korea',
            logo: 'https://s3.kstorage.vn/chainverse/chainverse/fiat-on-ramp/bank-logo/ibk.png',
        },
        {
            code: 'DAB',
            name: 'Ngân hàng TMCP Đông Á',
            name_en: 'Dong A Commercial Joint Stock Bank',
            logo: 'https://s3.kstorage.vn/chainverse/chainverse/fiat-on-ramp/bank-logo/dongabank.png',
        },
    ];

    const listBank = new Map<string, { code: string; name: string; logo: string; name_en: string }>();

    _listBank.forEach(({ name, code, logo, name_en }) => {
        listBank.set(code, { code, name, logo, name_en });
    });

    const createJwtToken = () => {
        const nowTs = moment().unix().valueOf();
        const expTs = moment().add(1, 'minute').unix().valueOf();
        return jwt.sign(
            {
                iss: APPOTA_PAY_PARTNER_CODE,
                jti: APPOTA_PAY_API_KEY + '-' + nowTs,
                api_key: APPOTA_PAY_API_KEY,
                exp: expTs,
            },
            APPOTA_PAY_SECRET_KEY,
            {
                algorithm: 'HS256',
                header: {
                    alg: 'HS256',
                    cty: 'appotapay-api;v=1',
                },
            }
        );
    };

    const createSign = (obj: { [k: string]: string | number }) => {
        const keys = Object.keys(obj);
        const sortedKeys = _.sortBy(keys);
        const sortedObj: { [k: string]: string | number | undefined } = {};
        _.map(sortedKeys, (key) => {
            sortedObj[key] = obj[key];
        });
        const str = qs.stringify(sortedObj, { encode: false });
        return crypto.createHmac('sha256', APPOTA_PAY_SECRET_KEY).update(str).digest().toString('hex');
    };

    const verifyCallbackData = (data: string, signature: string) => {
        const sign = cryptoHelper.createHmac('sha256', data, APPOTA_PAY_SECRET_KEY);
        if (sign !== signature) {
            throw new Error('Signature is not valid');
        }
        // Bước 1: Giải mã Base64
        const base64Decoded = atob(data);

        // Bước 2: Chuyển đổi chuỗi JSON thành đối tượng
        const jsonData = JSON.parse(base64Decoded);

        return jsonData as {
            event: string;
            data: any;
        };
    };

    return { verifyOutIP, listBank, _listBank, createJwtToken, createSign, verifyCallbackData };
};

export const appotaPayHelper = AppotaPayHelper();
