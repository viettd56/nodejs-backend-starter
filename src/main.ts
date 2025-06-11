require('dotenv').config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppService } from './app.service';
import { overrideConsoleLog } from './helpers/Logger.helper';

overrideConsoleLog();
async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const appService = app.select(AppModule).get(AppService, { strict: true });
    await appService.run();
    await app.close();
}
bootstrap();
