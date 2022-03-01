import * as dotenv from 'dotenv-safe';
import moment from 'moment';
import momentTz from 'moment-timezone';

dotenv.config({
    allowEmptyValues: true,
});

moment.locale('de');

momentTz.tz(process.env.TZ || 'Europe/Berlin');
