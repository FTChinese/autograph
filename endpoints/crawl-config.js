const debug = require('debug')('ag:crawl-config');
const got = require('got');
const writeJsonFile = require('write-json-file');
const uri = require('../util/uri.js');

/**
 * @class
 */
class CrawlConfig {
  constructor(url=uri.nightingale) {
    this.url = url;
  }

  async fetch() {
    debug(`Fetching: ${this.url}`);
    const start = new Date();
    this.data = await got(this.url, {
        json: true
      })
      .then(res => {
        return res.body;
      });
    const end = new Date();

    debug(`Length of nightingale-config.json: ${this.data.length}`);
    debug(`Time used ${(end - start)/1000}s`);
    return this.data;
  }

  async save() {
    if (!this.data) {
      await this.fetch();
    }
    return await writeJsonFile(uri.svgConfig, this.data);
  }
}

if (require.main == module) {
  const crawlConfig = new CrawlConfig();
  crawlConfig.save()
    .catch(err => {
      console.log(err);
    });
}

module.exports = CrawlConfig;