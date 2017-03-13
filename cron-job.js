const later = require('later');
const autoGraph = require('./index.js');

autoGraph();

// Execute on evry day 2 hours between 0-8 UTC time.
// const sched = later.parse.recur().on(0).hour();
const sched = later.parse.recur().on(0,2,4,6,8).hour();
// console.log(later.schedule(sched).next(10));
later.setInterval(autoGraph, sched);