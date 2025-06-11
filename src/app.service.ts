import { Injectable } from '@nestjs/common';
import { FastifyService } from './fastify/fastify.service';
import { DatabaseService } from './database/database.service';

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
