require('dotenv').config();

const { Sequelize } = require('sequelize');

const requiredEnvironment = ['DB_NAME', 'DB_USER', 'DB_PASSWORD', 'DB_HOST'];
const missingEnvironment = requiredEnvironment.filter((key) => !process.env[key]);

if (missingEnvironment.length) {
    throw new Error(`Missing database environment variables: ${missingEnvironment.join(', ')}`);
}

const port = Number(process.env.DB_PORT || 5432);

if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('DB_PORT must be a valid TCP port');
}

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port,
        dialect: 'postgres',
        dialectOptions: {
            connectionTimeoutMillis: 10000
        },
        logging: false
    }
);

module.exports = sequelize;
