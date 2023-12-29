const { Router } = require('express');
const cors = require('cors');
const App = new Router();

const BodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const { ErrorHandler, VerifyMethods } = require('../modules/middleware');
// Enable CORS
App.use(ErrorHandler.allowCrossDomain);
// Handle Error
App.use(ErrorHandler.errorHandler);
// Handle METHODS
App.use(VerifyMethods.allowedMethods);

App.use(cors());

App.use(BodyParser.json());
App.use(cookieParser());
App.use(BodyParser.urlencoded({ extended: false }));

const ACTIVE_VERSION = process.env.APP_ACTIVE_VERSION || 'v1';
const CurrentVersion = require(`./${ACTIVE_VERSION}`);

App.use(`/${ACTIVE_VERSION}`, CurrentVersion);

//Handle 404 for api not exist
App.use((req, res, next) => {
    err = new Error('Not Found');
    res.sendStatus('404');
});

module.exports = App;
