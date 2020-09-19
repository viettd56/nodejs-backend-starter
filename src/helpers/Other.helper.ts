import _ from 'lodash';
import escapeStringRegexp from 'escape-string-regexp';
import Exception from 'src/exeptions/Exception';
import ExceptionCode from 'src/exeptions/ExceptionCode';
import { Types } from 'mongoose';

const safeRegex = require('safe-regex');

const sortByKeys = (object) => {
    const keys = Object.keys(object);
    const sortedKeys = _.sortBy(keys);

    return _.fromPairs(_.map(sortedKeys, (key) => [key, object[key]]));
};

const changeAlias = (alias: string) => {
    let str = alias;
    if (alias) {
        str = str.toLowerCase();
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
        str = str.replace(/đ/g, 'd');
    }

    return str;
};

const changeAliasWithOutWhiteSpaces = (alias: string) => {
    let str = alias;
    if (alias) {
        str = str.toLowerCase();
        str = str.replace(/\s/g, '');
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
        str = str.replace(/đ/g, 'd');
    }

    return str;
};

const newRegExp = (_pattern: string, flag?: string) => {
    const pattern = escapeStringRegexp(_pattern);
    if (!safeRegex(pattern)) {
        throw new Exception('Input invalid', ExceptionCode.REGEX_NOT_SAFE);
    }
    return new RegExp(pattern, flag);
};

const createObjectID = (id: string) => {
    if (id) {
        return Types.ObjectId(id);
    }
    return undefined;
};

export const OtherHelper = {
    sortByKeys,
    changeAlias,
    changeAliasWithOutWhiteSpaces,
    newRegExp,
    createObjectID,
};
