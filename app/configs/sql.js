require('dotenv').config();
const env = process.env;

module.exports = {
    development: {
        databases: {
            mysql: {
                username: env.MYSQL_USERNAME,
                password: env.MYSQL_PASSWORD,
                database: env.MYSQL_DATABASE,
                host: env.MYSQL_HOSTNAME,
                dialect: 'mysql',
                dialectOptions: {
                    ssl: {
                        rejectUnauthorized: true,
                    },
                },
                define: {
                    timestamps: false,
                },
            }
        }
    },
};