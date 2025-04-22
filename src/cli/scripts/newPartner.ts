require('dotenv').config();
import { sequelize } from 'src/models/sequelize';

(async () => {
    await sequelize.authenticate();

    console.log('Done');
})();
