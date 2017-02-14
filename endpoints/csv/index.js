const got = require('got');
const buildArtifacts = require('../../util/build-artifacts.js');
const uri = require('../../util/uri.js');

const extractLinks = require('./extract-links.js'); 

/*
 * Scrape the index page to gather all csvs' name.
 */
function gatherCsv(url) {
  console.log(`fetching: ${url}`);
  return got(url)
    .then(res => {
      return res.body;
    })
    .then(contents => {
      return extractLinks(contents);
    });
}

/*
 * Fetch one csv file and save it.
 * Return the file's size in human readable format.
 */
function fetchAndSaveCsv(csv) {
  const url = uri.ofCsv(csv.name);
  console.log(`fetching: ${url}`);
  return got(url)
    .then(res => {
      return buildArtifacts.saveCsv(csv.name, res.body);
    })
    .then(size => {
      return Object.assign({size}, csv);
    });
}

/*
 * `csvs` is an array of object.
*/
function fetchAll(csvs) {
  const promisedStats = csvs.map(csv => {
    return fetchAndSaveCsv(csv);
  });

  return Promise.all(promisedStats)
    .then(stats => {
      return buildArtifacts.saveCsvStats(stats);
    });
}

function fetch(index=uri.index) {
  return gatherCsv(index)
    .then(csvs => {
      return fetchAll(csvs);
    });
}

if (require.main == module) {
  // scrape();
  fetch()
    .catch(err => {
      throw err;
    });
}

module.exports = fetch;