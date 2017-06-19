const path = require('path');
const interpreter = path.resolve(process.env.HOME, 'n/n/versions/node/8.1.0/bin/node');

module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : "autograph-server",
      script    : "app.js",
      interpreter: interpreter,
      env: {
        NODE_ENV: "development",
        PORT: 4000
      },
      env_production : {
        NODE_ENV: "production",
        PUBLIC_DIR: '/opt/nodestatic/autograph',
        DEBUG: 'ag*'
      }
    },

    // Second application
    {
      name      : "autograph-crawler",
      script    : "cron-job.js",
      log_date_format: "YYYY-MM-DD HH:mm Z",
      interpreter: interpreter,
      env: {
        NODE_ENV: "development",
        PUBLIC_URL: publicUrl
      },
      env_production: {
        NODE_ENV: "production",
        PUBLIC_DIR: '/opt/nodestatic/autograph'
      }
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
      user : "node",
      host : "localhost",
      ref  : "origin/master",
      repo : "git@github.com:FTChinese/autograph.git",
      path : "/var/www/production",
      "post-deploy" : "npm install && pm2 startOrRestart ecosystem.json --env production"
    }
  }
}
