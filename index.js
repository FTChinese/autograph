const chalk = require('chalk');
const endpoints = require('./endpoints');
const chartsRender = require('./charts');

async function autoGraph() {
  try {
  // First extrac csv and svg stats from remote HTML
  // Fetch JSON at the same time.
    await Promise.all([
      endpoints.extractStats(),
      endpoints.fetchJson()
    ]);

  // After the above three files are save
    await chartsRender();
  } catch (e) {
    console.log(chalk.red(e));
  }
}


if (require.main == module) {
    autoGraph();
}

module.exports = autoGraph;