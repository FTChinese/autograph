const chalk = require('chalk');
const got = require('got');
const buildArtifacts = require('../../util/build-artifacts.js');
const uri = require('../../util/uri.js');

// The returned data will be used to :
// 1. Draw charts
// 2. Extract glossary
function fetch(url=uri.svgConfig) {

  console.log(chalk.underline.cyan(`Fetching: ${url}`));

  return got(url, {
      json: true
    })
    .then(res => {
      return res.body;
    })
    .then(body => {
      console.log(chalk.red(`\nLength of nightingale-config.json: ${body.length}\n`));
      return buildArtifacts.saveSvgConfig(body);
    })
    .catch(err => {
      throw err;
    });
}

if (require.main == module) {
  fetch()
    .catch(err => {
      console.log(err);
    });
}

module.exports = fetch;