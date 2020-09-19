module.exports = {
    apps: [
        {
            name: 'main',
            script: './dist', // Your entry point
            instances: 1,
            autorestart: true, // THIS is the important part, this will tell PM2 to restart your app if it falls over
            max_memory_restart: '1G',
            exp_backoff_restart_delay: 100,
            watch: ['dist'],
            watch_delay: 1000,
        },
        {
            name: 'jobs',
            script: './dist/runJobs.js', // Your entry point
            instances: 1,
            autorestart: true, // THIS is the important part, this will tell PM2 to restart your app if it falls over
            max_memory_restart: '500M',
            log_file: 'logs/server.bull.log',
            exp_backoff_restart_delay: 100,
            watch: ['dist'],
            watch_delay: 1000,
        },
    ],
};
