import { ConnectMongoDBSetup } from './ConnectMongoDB.setup';
import { I18nSetup } from './I18n.setup';
import { OtherSetup } from './Other.setup';
import { ICradle } from 'src/container';

export const SetupService = ({ databaseConfig, serverConfig }: ICradle) => {
    return {
        async setup() {
            await ConnectMongoDBSetup(databaseConfig.MONGODB_URI, false);
            await I18nSetup();
            OtherSetup({ TIMEZONE: serverConfig.TIMEZONE });
        },
    };
};
