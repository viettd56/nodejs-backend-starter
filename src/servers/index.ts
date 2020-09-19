import { ICradle } from 'src/container';

export const ServerService = ({
    restfulServer,
    graphQLServer,
    moleculerService,
}: Pick<ICradle, 'restfulServer' | 'graphQLServer' | 'moleculerService'>) => {
    return {
        async start() {
            await moleculerService.start({
                createService: true,
            });
            await restfulServer.listen();
            await graphQLServer.listen();
        },
    };
};
