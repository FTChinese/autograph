const got = require('got');

const buildArtifacts = require('../../util/build-artifacts.js');
const uri = require('../../util/uri.js');

// The returned data will be used to :
// 1. Draw charts
// 2. Extract glossary
function fetch(url=uri.svgConfig) {
  console.log(`Fetching: ${url}`);
  return got(url, {
    json: true
  })
  .then(res => {
    return buildArtifacts.saveSvgConfig(res.body);
  })
  .catch(err => {
    throw err;
  });
}

if (require.main == module) {
  fetch();
}

module.exports = fetch;