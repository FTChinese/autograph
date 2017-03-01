const got = require('got');
const chalk = require('chalk');
const uri = require('../../util/uri.js');
const extract = require('./extract.js');
const buildArtifacts = require('../../util/build-artifacts.js');

function extractStats(url=uri.index) {

  console.log(chalk.underline.cyan(`Fetching: ${url}`));

  return got(url)
    .then(res => {
      return res.body;
    })
    .then(htmlBody => {
      console.log('Extracting CSV and SVG info...\n');
      return extract(htmlBody);
    })
    .then(stats => {

      console.log(chalk.red(`Total CSVs: ${stats.csv.length}`));
      console.log(chalk.red(`Total SVGs: ${stats.svg.length}\n`));

      return Promise.all([
        buildArtifacts.saveCsvStats(stats.csv),
        buildArtifacts.saveSvgStats(stats.svg)
      ]);
    })
    .catch(err => {
      throw err;
    });
}

if (require.main == module) {
  extractStats()
    .catch(err => {
      console.log(err);
    });
}

module.exports = extractStats;