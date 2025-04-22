require('dotenv').config();
import { OtherCache } from 'src/caches/OtherCache.cache';

require('dotenv').config();

(async () => {
    const cache = OtherCache(60);
    const resCache = await cache.set('test', 'test');
    console.log('🚀 ~ resCache:', resCache);

    const resGetCache = await cache.get('test');
    console.log('🚀 ~ resGetCache:', resGetCache);

    console.log('Done');
})();
