'use strict';

const dayjs = require('dayjs');
const winston = require('winston');
const { format, transports, createLogger } = winston;
const { combine, timestamp, printf, colorize, errors } = format;

process.env.TZ = 'Asia/Jakarta';

const enumerateErrorFormat = format((info) => {
    if (info.message instanceof Error) {
        info.message = Object.assign(
            {
                message: info.message.message,
                stack: info.message.stack
            },
            info.message
        );
    }

    if (info instanceof Error) {
        return Object.assign(
            {
                message: info.message,
                stack: info.stack
            },
            info
        );
    }

    return info;
});

const myFormat = printf((info) => {
    if (info instanceof Error) {
        return `[${dayjs(info.timestamp).format('YYYY-MM-DD hh:mm:ss')}][${info.level}]: ${enumerateErrorFormat(info)}`;
    }
    return `[${dayjs(info.timestamp).format('YYYY-MM-DD hh:mm:ss')}][${info.level}]: ${info.message}`;
});

const customFormat = () => {
    return combine(colorize({ all: true }), timestamp(), errors({ stack: true }), myFormat);
};

class Logging {
    logger;

    createLogging(args) {
        this.logger = createLogger({
            level: args.level,
            format: combine(colorize(), timestamp(), myFormat),
            transports: [
                //
                // - Write to all logs with level `info` and below to `combined.log`
                // - Write all logs error (and below) to `error.log`.
                //
                new transports.File({
                    filename: args.path + args.filename + '-errors.log', //args.errorSufix + '.log',
                    level: 'error'
                }),
                new transports.File({
                    filename: args.path + args.filename + '.log',
                    level: 'info'
                })
            ]
        });

        // Call exceptions.handle with a transport to handle exceptions
        this.logger.exceptions.handle(new transports.File({ filename: args.path + args.filename + '-exceptions.log' }));
    }

    createConsoleLogging(args) {
        this.logger = createLogger({
            level: args.level,
            format: customFormat(),
            transports: [new transports.Console()]
        });
    }

    init(args = {}) {
        const type = args.type || 'console';
        if (type === 'file') return this.createLogging(args);
        if (type === 'console') return this.createConsoleLogging(args);
        if (type === 'both') return this.both();
    }

    both() {
        this.createConsoleLogging(args);
        this.createLogging(args);
    }

    error(message) {
        this.logger.error(message);
    }

    warn(message) {
        this.logger.warn(message);
    }

    info(message) {
        this.logger.info(message);
    }

    http(message) {
        this.logger.http(message);
    }

    verbose(message) {
        this.logger.verbose(message);
    }

    debug(message) {
        this.logger.debug(message);
    }

    silly(message) {
        this.logger.silly(message);
    }
}

module.exports = new Logging();
