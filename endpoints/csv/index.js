const got = require('got');
const buildArtifacts = require('../../util/build-artifacts.js');
const uri = require('../../util/uri.js');

function getAndSaveCsv(name) {
  const url = uri.ofCsv(name);
  console.log(`Fetching: ${url}`);
  return got(url)
    .then(res => {
      return res.body;
    })
    .then(body => {
      return buildArtifacts.saveCsv(name, body);
    })
    .catch(err => {
      return err;
    });
}

function fetchCsvs() {
  return buildArtifacts.getCsvStats()
    .then(csvStats => {
      return Promise.all(csvStats.map(csv => {
        return getAndSaveCsv(csv.name);
      }));
    })
    .catch(err => {
      return err;
    });
}

if (require.main == module) {
  fetchCsvs()
    .catch(e => {
      console.log(e);
    });
}

module.exports = fetchCsvs;