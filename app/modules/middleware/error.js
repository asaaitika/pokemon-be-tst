const { ResponseHandler, Logging } = require('../../helpers');

module.exports = {
    errorHandler: (err, req, res, next) => {
        Logging.error('[MIDDLEWAREERROR] ' + JSON.stringify(err.stack));
        ResponseHandler.error(res, err);
    },

    allowCrossDomain: (err, req, res, next) => {
        res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Origin', '*');
        res.header(
            'Access-Control-Allow-Headers',
            'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, x-access-token, Authorization, tdid'
        );
        res.header('Access-Control-Allow-Methods', 'POST, GET,PUT, OPTIONS, DELETE, PATCH');
        if (req.method == 'OPTIONS') {
            res.sendStatus();
        } else {
            next();
        }
    }
};
