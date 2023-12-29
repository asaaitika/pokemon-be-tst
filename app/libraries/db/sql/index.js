'use strict';

const env = process.env;
const fs = require('fs');
const path = require('path');
const basename = path.basename(module.filename);

const { Sequelize } = require('sequelize');
const { Logging } = require('../../../helpers');

const isDev = env.NODE_ENV || 'development';
const config = require(__dirname + '/../../../configs/sql.js')[isDev];

const db = {};
const sequelizeInstances = {};

const databases = Object.keys(config.databases);

for (const key of databases) {
    let dbConfig = config.databases[key];

    sequelizeInstances[key] = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);

    db.Sequelize = Sequelize;
    db[key] = sequelizeInstances[key];

    db.Sequelize = Sequelize;
    db[key] = sequelizeInstances[key];
}

module.exports = db;
