import { config as envConfig } from 'dotenv';

envConfig({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

const { env } = process;

const APP_SECRET = env.APP_SECRET;
const PORT = env.PORT;
const MONGO_DB = env.MONGO_DB;
const MONGO_USER = env.MONGO_USER;
const MONGO_PASS = env.MONGO_PASS;
const LOG_MODE = env.LOG_MODE;

if(!APP_SECRET || !MONGO_DB || !MONGO_USER || !MONGO_PASS || !LOG_MODE) {
    console.info('APP_SECRET', APP_SECRET);
    console.info('MONGO_DB', MONGO_DB);
    console.info('MONGO_USER', MONGO_USER);
    console.info('MONGO_PASS', MONGO_PASS);
    console.info('LOG_MODE', LOG_MODE);
    throw new Error('Todas as variáveis de ambiente devem ser preenchidas');
};

export const environment = {
    APP_SECRET,
    PORT,
    MONGO_DB,
    MONGO_USER,
    MONGO_PASS,
    LOG_MODE,
} as const;
