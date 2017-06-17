const debug = require('debug')('ag:index');
const endpoints = require('./endpoints');
const chartsRender = require('./charts');
const crud = require('./util/crud.js');
const buildPage = require('./util/build-page.js');
const moment = require('moment-timezone');

async function autoGraph() {
  debug(`Starting autograph at: ${moment.utc().format()}`)
  try {

    const [config, stats] = await Promise.all([
      endpoints.crawlConfig,
      endpoints.crawlStats
    ]);

    const missing = await chartsRender(config, stats.svg);
    debug(`Missing svg: ${missing}`);

  } catch (e) {
    debug(e);
  }
  debug(`Finished autograph at: ${moment.utc().format()}`);
}

if (require.main === module) {
  const later = require('later');

  autoGraph();

  // Execute on evry day 2 hours between 0-8 UTC time.
  // const sched = later.parse.recur().on(0).hour();
  const sched = later.parse.recur().on(0,2,4,6,8).hour();
  // console.log(later.schedule(sched).next(10));
  later.setInterval(autoGraph, sched);  
}

module.exports = autoGraph;