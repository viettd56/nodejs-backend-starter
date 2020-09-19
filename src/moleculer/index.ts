import { ServiceBroker } from 'moleculer';
import JaegerService from 'moleculer-jaeger';
import { ICradle } from 'src/container';
import { OtherServices } from './OtherService';

export const MoleculerService = ({
    natsConfig,
    moleculerConfig,
    jaegerConfig,
    moleculerServiceSchema,
}: Pick<ICradle, 'natsConfig' | 'moleculerConfig' | 'jaegerConfig' | 'moleculerServiceSchema'>) => {
    const broker = new ServiceBroker({
        transporter: {
            type: 'NATS',
            options: {
                url: natsConfig.NATS_URL,
                token: natsConfig.NATS_TOKEN,
            },
        },
        metrics: true,
    });

    if (jaegerConfig.JAEGER_HOST) {
        broker.createService({
            mixins: [JaegerService],
            settings: {
                host: jaegerConfig.JAEGER_HOST,
                port: jaegerConfig.JAEGER_PORT,
            },
        } as any);
    }

    const _createService = () => {
        broker.createService(moleculerServiceSchema.createServiceSchema(moleculerConfig.MOLECULER_SERVICE_NAME));
    };

    const start = async ({ createService }: { createService: boolean }) => {
        console.log(`🚀 Moleculer ready`);
        broker.start();
        if (createService) {
            _createService();
        }
    };

    const otherServices = new OtherServices(broker);

    return {
        start,
        otherServices,
    };
};
