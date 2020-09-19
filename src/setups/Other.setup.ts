import moment from 'moment-timezone';
const MAX_LISTENER = 100;

export const OtherSetup = ({ TIMEZONE }: { TIMEZONE: string }) => {
    require('events').EventEmitter.defaultMaxListeners = MAX_LISTENER;
    moment.tz.setDefault(TIMEZONE);
};
