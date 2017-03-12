const later = require('later');
const autoGraph = require('./index.js');

autoGraph();

// Execute on 00:00 evry day UTC time.
// const sched = later.parse.recur().on(0).hour();
const sched = later.parse.recur().every(1).hour();
later.setInterval(autoGraph, sched);