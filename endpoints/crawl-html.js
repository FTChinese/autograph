const debug = require('debug')('ag:crawl-html');
const got = require('got');
const uri = require('../util/uri.js');
const crud = require('../util/crud.js');
const extract = require('./extract.js');

/**
 * 
 * @param {String} url - http://ig.ft.com/autograph/
 * @return {Promise<Object>}
 * @property {Object[]} csv
 * @property {Object[]} svg
 */
async function fetch(url=uri.autograph) {

  debug(`Fetching: ${url}`);

  const html = await got(url)
    .then(res => {
      return res.body;
    });

  const stats = extract(html);
  debug(`Total CSVs: ${stats.csv.length}`);
  debug(`Total SVGs: ${stats.svg.length}`);
// Only save csvStats. svgStats is not complete yet.
  await crud.saveCsvStats(stats.csv)
  return stats;
}

if (require.main == module) {
  fetch()
    .catch(err => {
      console.log(err);
    });
}

module.exports = fetch;