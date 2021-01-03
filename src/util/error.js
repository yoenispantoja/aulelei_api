/* eslint-disable prefer-rest-params */
/* eslint-disable no-shadow */
/* eslint-disable max-classes-per-file */
export function ExtendableBuiltin(cls) {
    function ExtendableBuiltin() {
        cls.apply(this, arguments);
    }
    ExtendableBuiltin.prototype = Object.create(cls.prototype);
    Object.setPrototypeOf(ExtendableBuiltin, cls);

    return ExtendableBuiltin;
}

export class BaseError extends ExtendableBuiltin(Error) {
    constructor(developerMessage, message, status) {
        super();
        this.developerMessage = developerMessage;
        this.message = message;
        this.status = status;
    }
}

export class InvalidId extends BaseError {
    constructor(id, entity) {
        const developerMessage = `${entity} with id: ${id} not found`;
        const message = `${entity} not found`;
        const status = 404;
        super(developerMessage, message, status);
    }
}

export class InvalidEmailAddress extends BaseError {
    constructor(email, entity) {
        const developerMessage = `${entity} with email: ${email} not found`;
        const message = `${entity} not found`;
        const status = 404;
        super(developerMessage, message, status);
    }
}

export class InvalidUser extends BaseError {
    constructor(name, entity) {
        const developerMessage = `${entity} with name: ${name} not found`;
        const message = `${entity} not found`;
        const status = 404;
        super(developerMessage, message, status);
    }
}

export class UserAlreadyExist extends BaseError {
    constructor(email) {
        const developerMessage = `User with email: ${email} already exist`;
        const message = `User with email: ${email} already exist`;
        const status = 409;
        super(developerMessage, message, status);
    }
}

export class NotAuthorized extends BaseError {
    constructor() {
        const developerMessage = 'User not authorized';
        const message = 'User not authorized';
        const status = 401;
        super(developerMessage, message, status);
    }
}

export class AuthError extends BaseError {
    constructor() {
        const developerMessage = 'Wrong user or password';
        const message = 'Wrong user or password';
        const status = 400;
        super(developerMessage, message, status);
    }
}

export class BadRequestError extends BaseError {
    constructor(msg = 'Bad request parameters') {
        const developerMessage = msg;
        const message = 'Bad request parameters';
        const status = 400;
        super(developerMessage, message, status);
    }
}

export class BulkError extends BaseError {
    constructor(msg = 'Incorrect data') {
        const developerMessage = msg;
        const message = msg;
        const status = 409;
        super(developerMessage, message, status);
    }
}

export class ApiError extends BaseError {
    constructor(msg = 'An unexpected error has occurred') {
        const developerMessage = msg;
        const message = 'An unexpected error has occurred';
        const status = 500;
        super(developerMessage, message, status);
    }
}

export class SocialAuthError extends BaseError {
    constructor(err) {
        const developerMessage = err;
        const message = err;
        const status = 400;
        super(developerMessage, message, status);
    }
}