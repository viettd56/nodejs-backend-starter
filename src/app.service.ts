import { Injectable } from '@nestjs/common';
import { DatabaseService } from './database/database.service';
import { FastifyService } from './core/fastify/fastify.service';

@Injectable()
export class AppService {
    constructor(
        private readonly databaseService: DatabaseService,
        private readonly fastifyService: FastifyService,
    ) {}

    public async run() {
        // await this.databaseService.sequelize.authenticate();
        await this.fastifyService.start();
    }
}
