import { FastifyInstance } from 'fastify';

const SwaggerService = () => {
    const registerSwagger = async (fastify: FastifyInstance) => {
        // Đăng ký swagger trước khi lắng nghe cổng
        await fastify.register(require('@fastify/swagger'), {
            openapi: {
                openapi: '3.0.0',
                info: {
                    title: 'Test swagger',
                    description: 'Testing the Fastify swagger API',
                    version: '0.1.0',
                },
                servers: [
                    {
                        url: 'http://localhost:3000',
                        description: 'Development server',
                    },
                ],
                components: {
                    securitySchemes: {
                        bearerAuth: {
                            type: 'http',
                            scheme: 'bearer',
                            bearerFormat: 'JWT',
                        },
                    },
                },
                security: [
                    {
                        bearerAuth: [],
                    },
                ],
                externalDocs: {
                    url: 'https://swagger.io',
                    description: 'Find more info here',
                },
            },
        });

        // Đăng ký swagger UI
        await fastify.register(import('@fastify/swagger-ui'), {
            routePrefix: '/documentation',
            uiConfig: {
                docExpansion: 'list',
                deepLinking: false,
            },
            uiHooks: {
                onRequest: (fastify as any).basicAuth,
            },
        });
    };

    return {
        registerSwagger,
    };
};

export const swaggerService = SwaggerService();
