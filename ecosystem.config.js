module.exports = {
    apps: [
        {
            name: 'main',
            script: '/app/src', // Your entry point
            instances: 1,
            autorestart: true, // THIS is the important part, this will tell PM2 to restart your app if it falls over
            max_memory_restart: '1G',
            log_file: 'logs/server.graphql.log',
            exp_backoff_restart_delay: 100,
        },
        {
            name: 'jobs',
            script: '/app/src/runJobs.js', // Your entry point
            instances: 1,
            autorestart: true, // THIS is the important part, this will tell PM2 to restart your app if it falls over
            max_memory_restart: '500M',
            log_file: 'logs/server.bull.log',
            exp_backoff_restart_delay: 100,
        },
    ],
};
