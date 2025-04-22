import moment from 'moment';
import * as fs from 'fs';
import { rimrafSync } from 'rimraf';
import url from 'url';

import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 20);

const getTime = () => {
    const momentUTC = moment().utc();
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

const removeFile = (filePath: string | string[]) => {
    if (typeof filePath === 'string') {
        if (fs.existsSync(filePath)) {
            try {
                rimrafSync(filePath);
            } catch (error) {}
        }
    } else {
        filePath.forEach((path) => {
            try {
                if (fs.existsSync(path)) {
                    rimrafSync(path);
                }
            } catch (error) {}
        });
    }
};

const addQueryString = (originalUrl: string, query: Record<string, string>) => {
    // Phân tích URL
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
    removeFile,
    nanoid,
    addQueryString,
};
