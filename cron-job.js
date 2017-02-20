const CronJob = require('cron').CronJob;
const autoGraph = require('./index.js');

const job = new CronJob({
// start at 00:00 every day UTC+8       
    cronTime: '0 0 * * *',
    onTick: autoGraph,
    start: true,
// See https://en.wikipedia.org/wiki/Time_in_China
    timeZone: 'Asia/Shanghai',
    runOnInit: true
});

job.start();