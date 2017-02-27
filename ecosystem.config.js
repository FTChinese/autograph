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
      env: {
        NODE_ENV: "development",
        PORT: 3001
      },
      env_production : {
        NODE_ENV: "production",
        PUBLIC_DIR: ""
      }
    },

    // Second application
    {
      name      : "autograph-crawler",
      script    : "cron-job.js",
      env: {
        NODE_ENV: "development"
      },
      env_production: {
        NODE_ENV: "production",
        PUBLIC_DIR: ""
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
      host : "212.83.163.1",
      ref  : "origin/master",
      repo : "git@github.com:FTChinese/autograph.git",
      path : "/var/www/production",
      "post-deploy" : "npm install && pm2 startOrRestart ecosystem.json --env production"
    },
    dev : {
      user : "node",
      host : "node.corp.ftchinese.com",
      ref  : "origin/master",
      repo : "git@github.com:FTChinese/autograph.git",
      path : "/data/git/ftacademy",
      "post-deploy" : "npm install && pm2 startOrRestart ecosystem.json --env dev",
      env  : {
        NODE_ENV: "dev"
      }
    }
  }
}
