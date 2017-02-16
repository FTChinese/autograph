const got = require('got');
const uri = require('../../util/uri.js');

const extractLinks = require('./extract-links.js'); 

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