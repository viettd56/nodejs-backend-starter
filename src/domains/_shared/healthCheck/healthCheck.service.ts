import moment from 'moment-timezone';
const HealthCheckService = () => {
    const check = () => {
        return {
            status: true,
            timestamp: moment().unix(),
        };
    };

    return {
        check,
    };
};

export const healthCheckService = HealthCheckService();
