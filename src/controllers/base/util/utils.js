import { validationResult } from 'express-validator';
import { BaseError, ApiError, BadRequestError } from '../../../util/error';
import { error } from '../../../util/logger';

export const catchAsync = (handler) => async(
    req,
    res,
    next
) => {
    try {
        await handler(req, res, next);
    } catch (e) {
        error(e);
        if (e instanceof BaseError) {
            res.status(e.status || 500).json(e);
        } else {
            next(new ApiError(e.message));
        }
    }
};

export const validate = async(req, res, validations) => {
    for (const validation of validations) {
        await validation.run(req);
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new BadRequestError(errors.array());
        // return res.status(422).json({
        // 	errors: errors.array()
        // });
    }
    return true;
};

export const sortByKey = (keyGetter, descending = false) => (left, right) => {
    const l = keyGetter(left);
    const r = keyGetter(right);
    if (l < r) {
        return descending ? 1 : -1;
    }
    if (r < l) {
        return descending ? -1 : 1;
    }
    return 0;
};

export const generateRandomNum = (cifras = 6) =>
    String(Math.floor(10 ** (cifras - 1) + Math.random() * 9 * (10 ** (cifras - 1))));

export const generateEmail = (username) => `${username}${generateRandomNum(2)}@dymsoft.net`;

export const generateAccount = (username) => [generateEmail(username), generateRandomNum()];

export const pick = (obj, attributes = []) => {
    const keys = Object.keys(obj);
    const newObj = {};
    for (const key of keys) {
        if (attributes.includes(key) && obj[key]) newObj[key] = obj[key];
    }
    return newObj;
};

export const generateRandomString = (length = 7) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

export const getKeyByValue = (object, value) => Object.keys(object).find(key => object[key] === value);