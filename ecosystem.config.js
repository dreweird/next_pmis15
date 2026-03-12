module.exports = {
  apps: {
    name: 'PMIS-2026',
    script: 'node_modules/next/dist/bin/next',
    cwd: './',
    args: 'start',
    instances: 4,
    exec_mode: 'cluster',
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: 
      {
        NODE_ENV: 'development'
      },
      env_production: 
      {
        NODE_ENV: 'production'
      }
  }
}