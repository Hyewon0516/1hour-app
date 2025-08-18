module.exports = {
  apps: [{
    name: 'cndf-homepage',
    script: 'npm',
    args: 'start',
    cwd: '/Users/msoh/git/CNDF/cndf-v2',
    env: {
      NODE_ENV: 'production',
      PORT: 8080,
      NEXT_TELEMETRY_DISABLED: 1
    },
    max_memory_restart: '500M',
    exp_backoff_restart_delay: 100,
    error_file: './../logs/error-20250413.log',
    out_file: './../logs/service-20250413.log',
    merge_logs: true,
    time: true,
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    instances: 1,
    exec_mode: 'fork',
    watch: false,
    autorestart: true,
    max_restarts: 10,
    restart_delay: 4000,
    kill_timeout: 3000
  }]
}
