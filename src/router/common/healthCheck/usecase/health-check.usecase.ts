import moment from 'moment-timezone';
const healthCheck = () => {
    return {
        status: true,
        timestamp: moment().unix(),
    };
};

export { healthCheck };
