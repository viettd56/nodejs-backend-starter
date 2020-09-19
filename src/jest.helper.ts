import { seedDB } from 'src/seedDB';
import { ConnectMongoDBSetup } from 'src/setups/ConnectMongoDB.setup';
import { v4 } from 'uuid';
import mongodbUri from 'mongodb-uri';
const mongoUriBuilder = require('mongo-uri-builder');

export const JestHelper = () => {
    if (process.env.MONGO_URL === undefined) {
        throw new Error('mongo url invalid');
    }

    const mongoUri = mongoUriBuilder({
        host: mongodbUri.parse(process.env.MONGO_URL).hosts[0].host,
        port: mongodbUri.parse(process.env.MONGO_URL).hosts[0].port,
        database: v4(),
    });

    const initDatabase = async () => {
        await ConnectMongoDBSetup(mongoUri, false);
        await seedDB({
            database: mongoUri,
        });
    };

    return {
        initDatabase,
        mongoUri,
    };
};
