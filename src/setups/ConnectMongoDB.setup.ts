import { MongooseHelper } from 'src/helpers/Mongoose.helper';
import { appLogger } from 'src/logger';

export const ConnectMongoDBSetup = async (uri: string, autoIndex: boolean) => {
    try {
        await MongooseHelper.connect(uri, autoIndex);
    } catch (error) {
        appLogger.error(error);
    }
};
