const SUCCESS_CREATED = 201;
const SUCCESS_NO_CONTENT = 204;
const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const ACCESS_FORBIDDEN = 403;
const NOT_FOUND = 404;
const UNPROCESSABLE_ENTITY = 422;
const SERVER_ERROR = 500;

const ENV = process.env;

const { ValidationError, UnAuthorizedError } = require('../exceptions');
const Logging = require('../logging');
const isSecure = ENV.NODE_ENV != 'development';

const formatResponse = (status = true, data = [], message = 'Success') => {
    return {
        status: true,
        message: message,
        data: data
    };
};

module.exports = {
    success: (res, data, message = 'Success') => {
        res.send(formatResponse(true, data, message));
    },

    created: (res, data) => {
        res.status(SUCCESS_CREATED).send(formatResponse(true, data, message));
    },

    noContent: (res) => {
        res.sendStatus(SUCCESS_NO_CONTENT);
    },

    successLogIn: (res, data, message = 'Success') => {
        res.send({
            status: true,
            message: message,
            data: { accessToken: data.accessToken }
        });
    },

    customStatus: (res, statusCode) => {
        res.sendStatus(statusCode);
    },

    customStatusWithMessage: (res, statusCode, message) => {
        res.status(statusCode).send({
            status: false,
            message: message
        });
    },

    customUnAuthorized: (res, message) => {
        res.status(UNAUTHORIZED).send({
            status: false,
            message: message
        });
    },

    error: (res, error) => {
        if (!isSecure) {
            Logging.error(JSON.stringify(error.name));
            Logging.error(JSON.stringify(error.stack));
            Logging.error(JSON.stringify(error.statusCode));
        }
        let response = {};
        response.status = error.status || false;
        response.message = error.message;

        if (error instanceof ValidationError && Array.isArray(error.errors)) {
            response.errors = error.errors;
        }

        if (error.name === 'TypeError') {
            error.statusCode = SERVER_ERROR;
            response.message = 'Something went wrong!, please contact administrator';
        }

        res.status(error.statusCode ? error.statusCode : BAD_REQUEST).send(response);
    }
};
