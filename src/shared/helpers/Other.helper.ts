/* eslint-disable @typescript-eslint/no-unsafe-return */
import moment from 'moment-timezone';
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 20);

const getTime = () => {
    const momentUTC = moment.utc();
    return {
        today: () => Number(momentUTC.format('YYYYMMDD')),
        todayWeek: () => Number(momentUTC.format('YYYY') + moment().week().toString()),
        todayMonth: () => Number(momentUTC.format('YYYYMM')),
        todayYear: () => Number(momentUTC.format('YYYY')),
        now: () => momentUTC.unix(),
        momentUTC: () => momentUTC,
    };
};

function camelToSnakeCase(str: string) {
    let result = str.replace(/[A-Z]/g, (c) => `_${c.toLowerCase()}`);
    if (result[0] === '_') {
        result = result.slice(1);
    }
    return result;
}

const objectKeyToSnake = (obj: any) => {
    const snakeCaseObject: any = {};
    for (const key in obj) {
        const snakeCaseKey = camelToSnakeCase(key);
        snakeCaseObject[snakeCaseKey] = obj[key];
    }
    return snakeCaseObject;
};

const addQueryString = (originalUrl: string, query: Record<string, string>) => {
    const parsedUrl = new URL(originalUrl);

    Object.entries(query).forEach(([key, value]) => {
        parsedUrl.searchParams.append(key, value);
    });

    return parsedUrl.toString();
};

export const OtherHelper = {
    getTime,
    camelToSnakeCase,
    objectKeyToSnake,
    nanoid,
    addQueryString,
};
