var CronJob = require('cron').CronJob;
var autograph = require('../index.js');


new CronJob({
  cronTime: '46 17 * * *',
  onTick: function() {
    console.log('run every minute');
  },
  start: true,
  timeZone: 'Asia/Shanghai',
  runOnInit: true
});