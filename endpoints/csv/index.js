const fs = require('fs-jetpack');
const path = require('path');
const co = require('co');
const got = require('got');
const buildArtifacts = require('../../util/build-artifacts.js');
const uri = require('../../util/uri.js');

const extractLinks = require('./extract-links.js'); 

function gatherStats(url) {
  console.log(`fetching: ${url}`);
  return got(url)
    .then(res => {
      return res.body;
    })
    .then(contents => {
      return extractLinks(contents);
    })
    .catch(err => {
      throw err;
    });
}

function fetchCsv(filename) {
  const url = uri.ofCsv(filename);
  console.log(`fetching: ${url}`);
  return got(url)
    .then(res => {
      return res.body;
    })
    .catch(err => {
      throw err;
    });
}

function scrape(index=uri.index) {
  return co(function *() {
    const stats = yield gatherStats(index);

    yield stats.map(csv => {
      return fetchCsv(csv.name)
        .then(content => {
          return buildArtifacts.saveCsv(csv.name, content)
        });
    });

    yield buildArtifacts.saveCsvStats(stats);
  })
  .catch(err => {
    throw err;
  });
}

if (require.main == module) {
  scrape();
}

module.exports = scrape;