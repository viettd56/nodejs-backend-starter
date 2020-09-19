import mongoose from 'mongoose';

export class MongooseHelper {
    static connect(uri: string, autoIndex: boolean) {
        const options: mongoose.ConnectionOptions = {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
            autoIndex,
        };

        return mongoose.connect(uri, options);
    }

    static disconnect() {
        return mongoose.disconnect();
    }

    static getConnectionToDB(databaseName: string) {
        return mongoose.connection.useDb(databaseName);
    }
}
