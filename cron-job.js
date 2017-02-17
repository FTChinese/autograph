const CronJob = require('cron');
const autoGraph = require('./index.js');

const job = new CronJob({
// start at 00:00 every day UTC+8       
    cronTime: '0 0 * * *',
    onTick: autoGraph,
    start: true,
    timeZone: 'Asia/Shanghai',
    runOnInit: true
});

job.start();