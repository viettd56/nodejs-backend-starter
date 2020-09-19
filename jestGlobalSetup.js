const fs = require('fs');
const { resolve, join } = require('path');
const MongodbMemoryServer = require('mongodb-memory-server');
const cwd = process.cwd();

const mongod = new MongodbMemoryServer.default(getMongodbMemoryOptions());

// const globalConfigPath = join(cwd, 'globalConfig.json');

const dotEnv = require('dotenv');
const path = require('path');

module.exports = async () => {
    if (process.env.DOTENV_FILE) {
        const envPath = path.join(__dirname, process.env.DOTENV_FILE);
        const envConfig = dotEnv.parse(fs.readFileSync(envPath));
        for (const k in envConfig) {
            process.env[k] = envConfig[k];
        }
    }
    if (!mongod.isRunning) {
        await mongod.start();
    }

    const uri = await mongod.getUri();

    // Write global config to disk because all tests run in different contexts.
    // fs.writeFileSync(globalConfigPath, JSON.stringify(mongoConfig));

    // Set reference to mongod in order to close the server during teardown.
    global.__MONGOD__ = mongod;
    process.env.MONGO_URL = uri;
};

function getMongodbMemoryOptions() {
    try {
        const { mongodbMemoryServerOptions } = require(resolve(cwd, 'jest-mongodb-config.js'));

        return mongodbMemoryServerOptions;
    } catch (e) {
        return {
            binary: {
                skipMD5: true,
            },
            autoStart: false,
            instance: {},
        };
    }
}
