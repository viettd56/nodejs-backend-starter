import mongoose from 'mongoose';
import axios from 'axios';
import { ICradle } from 'src/container';

export const ServerHealthController = ({
    redisService,
    graphQLConfig,
}: Pick<ICradle, 'redisService' | 'graphQLConfig'>) => {
    const checkDatabase = async () => {
        if (mongoose.connection.readyState !== 1) {
            throw new Error('Server Health error: Connect mongodb error ' + mongoose.connection.readyState);
        }
        const redisPing = await redisService.redis.ping();
        // Redis handle error
        if (redisPing !== 'PONG') {
            throw new Error('Server Health error: Connect redis error ' + redisPing);
        }
    };

    const checkGraphQL = async () => {
        return axios.get('/.well-known/apollo/server-health', {
            baseURL: `http://localhost:${graphQLConfig.GRAPHQL_PORT}`,
        });
    };

    const check = async () => {
        await checkDatabase();
        await checkGraphQL();
    };

    return {
        check,
    };
};
