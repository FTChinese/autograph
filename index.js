const chalk = require('chalk');
const endpoints = require('./endpoints');
const chartsRender = require('./charts');
const buildArticfacts = require('./util/build-artifacts.js');
const buildPage = require('./util/build-page.js');

async function autoGraph() {
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

  try {
  // Generate a static html file
  // Read `csv-stats.json` and `svg-stats.json` as nunjucks rendering context.
    const html = await buildPage();
    await buildArticfacts.saveIndexPage(html);
  } catch(e) {
    console.log(chalk.red(e));
  }
}

if (require.main == module) {
  const styles = require('./util/styles.js');

  styles.build()
    .catch(err => {
      console.log(err);
    });
  
  autoGraph()
    .catch(err => {
      console.log(err);
    });
}

module.exports = autoGraph;