import { createAppContainer } from './container';
import path from 'path';

let envPath: string | undefined = undefined;

if (process.env.DOTENV_FILE) {
    envPath = path.join(__dirname, '..', process.env.DOTENV_FILE);
}

const container = createAppContainer(envPath);

const setupService = container.cradle.setupService;
const serverService = container.cradle.serverService;

(async () => {
    await setupService.setup();
    await serverService.start();
})().catch((e) => {
    console.error(e);
});
