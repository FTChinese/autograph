/*
 * Crawl data from http://ig.ft.com/autograph every two hours
 * Use the crawled data to drow svg 
 */
const debug = require('debug')('ag:index');
const moment = require('moment-timezone');
const endpoints = require('./endpoints');
const renderCharts = require('./charts');

async function autoGraph() {
  debug(`Starting autograph at: ${moment.utc().format()}`)
  try {
// Crawl the SVG rending data, and file info of csv and svg.
    const [config, stats] = await Promise.all([
      endpoints.crawlConfig(),
      endpoints.crawlStats()
    ]);

    debug(`Nightingale config has ${config.length} items`);

    const missing = await renderCharts(config, stats.svg);

  } catch (e) {
    debug(e);
  }
}

if (require.main === module) {
  const later = require('later');

  autoGraph()
    .catch(err => {
      console.log(err);
    });

  // Execute on evry day 2 hours between 0-8 UTC time.
  // const sched = later.parse.recur().on(0).hour();
  const sched = later.parse.recur().on(0,2,4,6,8).hour();
  // console.log(later.schedule(sched).next(10));
  later.setInterval(autoGraph, sched);  
}

module.exports = autoGraph;