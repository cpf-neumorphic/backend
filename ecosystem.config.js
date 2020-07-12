module.exports = {
    apps: [{
        name: 'backend',
        script: 'npm',
        args: 'start',
        exec_mode: 'cluster',
        instances: 'max',
        watch:false,
        max_memory_restart: '300M',
    }]
}
