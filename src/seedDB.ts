const path = require('path');
import { Seeder, SeederConfig } from 'mongo-seeding';

export const seedDB = async ({ database }: { database: Partial<SeederConfig['database']> }) => {
    const config = {
        database,
        dropDatabase: true,
    };
    const seeder = new Seeder(config);
    const collections = seeder.readCollectionsFromPath(path.join(__dirname, 'seed'), {
        extensions: ['js', 'json', 'ts'],
    });

    await seeder.import(collections);
};
