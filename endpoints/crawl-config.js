const debug = require('debug')('ag:crawl-config');
const got = require('got');
const uri = require('../util/uri.js');
const crud = require('../util/crud.js');

// The returned data will be used to :
// 1. Draw charts
// 2. Extract glossary
async function fetch(url=uri.nightingale) {

  debug(`Fetching: ${url}`);

  const start = new Date();
  const nightingale = await got(url, {
      json: true
    })
    .then(res => {
      return res.body;
    });

  const end = new Date()
  debug(`Length of nightingale-config.json: ${nightingale.length}`);
  debug(`Time used ${(end - start)/1000}s`);

  await crud.saveSvgConfig(nightingale);
  return nightingale;
}

if (require.main == module) {
  fetch()
    .catch(err => {
      console.log(err);
    });
}

module.exports = fetch;