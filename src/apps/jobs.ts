require('dotenv').config();
import { INestApplicationContext } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { DatabaseModule } from 'src/database/database.module';
import { DatabaseService } from 'src/database/database.service';
import { overrideConsoleLog } from 'src/shared/helpers/Logger.helper';
import { JobsModule } from 'src/jobs/jobs.module';
import { JobsService } from 'src/jobs/jobs.service';
import { Cron } from 'croner';

overrideConsoleLog();

function bullJobs(app: INestApplicationContext) {
    const jobService = app.select(JobsModule).get(JobsService, { strict: true });
    jobService.sendRequest.worker.worker.run().catch((err) => {
        console.error(err);
        app.close();
    });
}

function cronJobs(app: INestApplicationContext) {
    cronExample(app);
}

const cronExample = (app: INestApplicationContext) => {
    let running = false;
    const run = async () => {
        console.log('🚀 ~ file: jobs.ts:55 ~ job ~ job: cronExample');
    };
    const job = new Cron('0 * * * *', async () => {
        try {
            if (running === false) {
                running = true;
                await run();
                running = false;
            }
        } catch (error) {
            running = false;
            console.error(error);
        }
    });
};

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const databaseService = app.select(DatabaseModule).get(DatabaseService, { strict: true });
    const sequelize = databaseService.sequelize;
    await sequelize.authenticate();

    bullJobs(app);
    cronJobs(app);

    await app.close();
}
bootstrap();
