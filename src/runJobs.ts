import { createAppContainer } from './container';
import path from 'path';

let envPath: string | undefined = undefined;

if (process.env.DOTENV_FILE) {
    envPath = path.join(__dirname, '..', process.env.DOTENV_FILE);
}
const container = createAppContainer(envPath);

(async () => {
    await container.cradle.setupService.setup();
    await container.cradle.jobProcess.process();
})().catch((e) => {
    console.error(e);
});
