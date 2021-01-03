require('dotenv').config();

export const development = {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    dropOnSeed: false
};

export const production = {
    //database: process.env.DB_NAME,
    //username: process.env.DB_USER,
   // password: process.env.DB_PASS,
    //host: process.env.DB_HOST,
    //port: process.env.DB_PORT,
    //dialect: 'mysql',
    //dropOnSeed: false,
    use_env_variable: 'DATABASE_URL'
};