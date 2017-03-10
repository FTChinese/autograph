const autoGraph = require('./index.js');
const cron = require('node-cron');

autoGraph();
cron.schedule('0 0 * * *', autoGraph);