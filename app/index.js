const Express = require('express');
const App = Express();

// Initialize config file
require('dotenv').config();

process.env.TZ = 'Asia/Jakarta';

// Initialize logging
const { Logging } = require('./helpers');
Logging.init({
    path: process.env.LOG_PATH,
    level: process.env.LOG_LEVEL,
    type: process.env.LOG_TYPE, //Logging or write to file
    filename: process.env.LOG_FILENAME
});


// Initialize MySQL connection
const Sql = require('./libraries/db/sql');

(async () => {
    try {
        await Sql['mysql'].authenticate();
        Logging.info(`[MySQL] >>>> successfully connected!!!`);
    } catch (error) {
        Logging.error(`[MySQL] >>>> Unable to connect to the database!`, error);
        Logging.error(`[MySQL] >>>> Unable to connect to the database!`, error.stack);
        throw error;
    }
})();

const { ResponseHandler } = require('./helpers');

//API check health
App.get('/', (_, res, next) => {
    try {
        const healthcheck = {
            uptime: process.uptime(),
            message: 'OK',
            timestamp: Date.now()
        };
        ResponseHandler.success(res, healthcheck);
    } catch (error) {
        ResponseHandler.customStatus(res, 503);
    }
});

//setup endpoint/router
const Router = require('./api');
App.use('/api', Router);

const PORT = process.env.APP_PORT || 3000;
App.listen(PORT);
console.info('[APP] API POKEMON TEST PHC - ASA STARTED on ' + PORT);

module.exports = App;
