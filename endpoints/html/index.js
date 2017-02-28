const got = require('got');
const uri = require('../../util/uri.js');
const extract = require('./extract.js');
const buildArtifacts = require('../../util/build-artifacts.js');

function fetchAndExtract(url=uri.index) {
  console.log(`fetching: ${url}`);
  return got(url)
    .then(res => {
      return res.body;
    })
    .then(contents => {
      return extract(contents);
    })
    .then(stats => {
      return Promise.all([
        buildArtifacts.saveCsvStats(stats.csv),
        buildArtifacts.saveSvgStats(stats.svg)
      ]);
    })
    .catch(err => {
      return err;
    });
}

if (require.main == module) {
  fetchAndExtract()
    .catch(err => {
      console.log(err);
    });
}

module.exports = fetchAndExtract;