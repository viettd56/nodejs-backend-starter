/* eslint-disable @typescript-eslint/no-require-imports */
require('dotenv').config();
import { sequelize } from 'src/models/sequelize';
import { SequelizeStorage, Umzug } from 'umzug';

const prefix = 'API-';

(async () => {
    await sequelize.authenticate();

    const umzug = new Umzug({
        migrations: [
            {
                name: prefix + 'create-schema',
                async up({ context }) {
                    await sequelize.createSchema('data', {}).catch(console.error);
                },
            },
            {
                name: prefix + 'sync-db',
                async up({ context }) {
                    await sequelize.sync();
                },
            },
        ],
        logger: console,
        storage: new SequelizeStorage({ sequelize }),
    });

    if (process.argv[2] === 'up') {
        if (process.argv[3]) {
            const migrations = await umzug.up({ migrations: [prefix + process.argv[3]] });
            console.log({ migrations });
        } else {
            // const migrations = await umzug.up();
            // console.log({ migrations });
        }
    } else if (process.argv[3] && process.argv[2] === 'down') {
        await umzug.down({ migrations: [prefix + process.argv[3]] });
    } else if (process.argv[3] && process.argv[2] === 'reset') {
        await umzug.down({ migrations: [prefix + process.argv[3]] });
        await umzug.up({ migrations: [prefix + process.argv[3]] });
    } else {
        throw new Error('argument invalid');
    }

    console.log('Done');
})().catch(console.error);
