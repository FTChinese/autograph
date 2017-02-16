const got = require('got');
const uri = require('../../util/uri.js');
const extract = require('./extract.js'); 

function fetchHtml(url=uri.index) {
  console.log(`fetching: ${url}`);
  return got(url)
    .then(res => {
      return res.body;
    })
    .then(contents => {
      return extract(contents);
    })
    .catch(err => {
      console.log(err);
    });
}

if (require.main == module) {
  fetchHtml()
    .then(result => {
      console.log(result);
    })
    .catch(err => {
      console.log(err);
    });
}

module.exports = fetchHtml;