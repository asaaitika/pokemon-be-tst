const { ResponseHandler, Logging } = require('../../helpers');
const { UnAuthorizedError } = require('../../helpers/exceptions');

const isSecure = process.env.ENV != 'development';

module.exports = {
    verifyToken: async (req, res, next) => {
        try {
            const authHeader = req.headers.authorization || req.headers.Authorization;
            if (!authHeader?.startsWith('Bearer ')) throw new UnAuthorizedError();

            req.userContext = {};
            next();
        } catch (error) {
            Logging.error(`[VERIFY][TOKEN][MIDDLEWARE] >>>>> ${JSON.stringify(error.message)}`);
            if (isSecure) {
                Logging.error(`[VERIFY][TOKEN][MIDDLEWARE] >>>>> ${JSON.stringify(error.stack)}`);
            }
            ResponseHandler.error(res, error);
        }
    }
};
