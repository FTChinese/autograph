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
      interpreter: "~/n/versions/node/7.7.1/bin/node",
      env: {
        NODE_ENV: "development",
        PORT: 4000,
        PUBLIC_DIR: "public/autograph"
      },
      env_production : {
        NODE_ENV: "production",
        PUBLIC_DIR: "~/static/autograph"
      }
    },

    // Second application
    {
      name      : "autograph-crawler",
      script    : "cron-job.js",
      interpreter: "~/n/versions/node/7.7.1/bin/node",
      env: {
        NODE_ENV: "development",
        PUBLIC_DIR: "public/autograph"
      },
      env_production: {
        NODE_ENV: "production",
        PUBLIC_DIR: "~/static/autograph"
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
