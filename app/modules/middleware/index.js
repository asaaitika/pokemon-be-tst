const ErrorHandler = require('./error');
const VerifyToken = require('./isAuthenticated');
const VerifyMethods = require('./methodRequest');

module.exports = {
    ErrorHandler,
    VerifyToken,
    VerifyMethods
};
