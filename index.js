const chalk = require('chalk');
const endpoints = require('./endpoints');
const chartsRender = require('./charts');
const buildArticfacts = require('./util/build-artifacts.js');
const buildPage = require('./util/build-page.js');
const moment = require('moment-timezone');

async function autoGraph() {
  console.log('===============');
  console.log(`Starting autograph at: ${moment.utc().format()}`)
  try {
  // First extrac csv and svg stats from remote HTML
  // Save to `csv-stats.json` and svg-stats.json
  // Fetch `nightingale-config.json` and save it at the same time.
    await Promise.all([
      endpoints.extractStats(),
      endpoints.fetchJson()
    ]);

  // After the above three files are save,
  // read `nightingale-config.json` and compile css.
  // Render SVG using data in `nightingale-config.json`,
  // and insert css to each SVG file.
  // After SVGs generated, use `fs.stat()` to get each file's size and merge theme into `svg-stats.json`
    await chartsRender();

  } catch (e) {
    console.log(chalk.red(e));
  }
  console.log(`Finished autograph at: ${moment.utc().format()}`);
  console.log(`================`);
}

if (require.main == module) {
  const styles = require('./util/styles.js');
  
  autoGraph()
    .catch(err => {
      console.log(err);
    });
}

module.exports = autoGraph;