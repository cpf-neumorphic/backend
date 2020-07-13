module.exports = {
    apps: [{
        name: 'backend',
        script: './bin/www',
        env_production:{
            "NODE_ENV": "production"
        },
        exec_mode: 'cluster',
        instances: 2,
        autorestart: true,
        watch:false,
        max_memory_start: '1G',
    }]
}
