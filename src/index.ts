require('dotenv').config();
import { createServer } from 'http';
import { app } from './app';
import { OtherCache } from './caches/OtherCache.cache';

const PORT = 3000;

(async () => {
    const server = createServer(app);
    server.listen(PORT);

    console.log('Server running at: ' + PORT);
})();
