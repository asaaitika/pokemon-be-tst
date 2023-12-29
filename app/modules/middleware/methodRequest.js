const { ResponseHandler } = require('../../helpers');
const { ForbiddenError } = require('../../helpers/exceptions');

const ALLOWED_METHODS = ['OPTIONS', 'HEAD', 'CONNECT', 'GET', 'POST', 'PUT', 'DELETE', 'PATCH'];

module.exports = {
    allowedMethods: (req, res, next) => {
        try {
            // NOTE: Exclude TRACE and TRACK methods to avoid XST attacks.
            if (!ALLOWED_METHODS.includes(req.method)) {
                throw new ForbiddenError(`${req.method} not allowed.`);
            }
            next();
        } catch (error) {
            ResponseHandler.error(res, error);
        }
    }
};
