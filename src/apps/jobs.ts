require('dotenv').config();
import { Cron } from 'croner';
import moment from 'moment';
import { Op } from 'sequelize';
import { SendRequestWorker } from 'src/jobs/worker/SendRequest.worker';
import { VerifyOrderWorker } from 'src/jobs/worker/VerifyOrder.worker';

const cronPushPostNotify = () => {
    let running = false;
    const job = Cron('* * * * *', async () => {
        try {
            if (running === false) {
                running = true;
            }
        } catch (error) {
            console.error(error);
        } finally {
            running = false;
        }
    });
};

const jobs = () => {
    VerifyOrderWorker()
        .worker.run()
        .then(() => {
            console.log('VerifyOrderWorker is running');
        })
        .catch((err) => {
            console.error(err);
            process.exit(1);
        });

    SendRequestWorker()
        .worker.run()
        .then(() => {
            console.log('SendRequestWorker is running');
        })
        .catch((err) => {
            console.error(err);
            process.exit(1);
        });
};

const run = () => {
    jobs();
    console.log('Jobs is running');
    // cronPushPostNotify();
};

run();
