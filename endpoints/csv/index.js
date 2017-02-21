const got = require('got');
const buildArtifacts = require('../../util/build-artifacts.js');
const uri = require('../../util/uri.js');

/*
 * `csvs` is an array of object.
*/
function fetch(csvs) {
  const promisedStats = csvs.map(csv => {
// construct url with csv.name    
    const url = uri.ofCsv(csv.name);
    console.log(`fetching: ${url}`);
// fetch this url    
    return got(url)
      .then(res => {
// save the fetched contents and return the filesize calcaluted from contents        
        return buildArtifacts.saveCsv(csv.name, res.body);
      })
      .then(size => {
// merge size into `csv` object and return a new object
        return Object.assign({}, csv, {size});
      });
  });
// parrallel excection of all fetch and save csv statistics
  return Promise.all(promisedStats)
    .then(stats => {
      return buildArtifacts.saveCsvStats(stats);
    });
}


if (require.main == module) {
  const fetchHtml = require('../html');
  fetchHtml()
    .then(stats => {
      console.log(stats);
      return fetch(stats.csvs);
    })
    .catch(err => {
      console.log(err);
    });
}

module.exports = fetch;