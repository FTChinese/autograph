const debug = require('debug')('ag:crawl-html');
const got = require('got');
const cheerio = require('cheerio');
const fs = require('fs-jetpack');
const path = require('path');
const uri = require('../util/uri.js');

class CrawlHTML {
  constructor(url = uri.autograph) {
    this.url = url;
  }
/**
 * @return {Promise<String>} - The HTML file
 */
  async fetch() {
    debug(`Fetching: ${this.url}`);
    this.html = await got(this.url)
      .then(res => {
        return res.body;
      });
  }
/**
 * @param {String} html 
 */
  async saveHTML() {
    if (!this.html) {
      await this.fetch();
    }
    const dest = `${uri.publicDir}/index.html`;
    debug(`Saving HTML file: ${dest}`);
    return await fs.writeAsync(dest, this.html);
  }
/**
 * @param {String} html 
 * @return {Object} - cheerio object
 */
  parse() {
    this.$ = cheerio.load(this.html);
  }
/**
 * @param {Object} $ - cheerio object
 * @return {Object[]} - [{"name": "", "size": "", "lastModified": ""}]
 */
  get csvStats() {
    const rowEls = this.$('table.datasets').find('tr');
    
    return rowEls.map((index, row) => {
      const tdEls = this.$(row).children('td');
      const firstTdEl = tdEls.eq(0);
      const fileName = firstTdEl.children('a').text();
      const fileSize = firstTdEl.clone().children().remove().end().text();
      const lastModified = tdEls.eq(1).text();
      return {
        "name": fileName,
        "size": fileSize.trim(),
        "lastModified": lastModified
      }
    }).get();
  }
/**
 * 
 * @param {Object} $ - cheerio object
 * @return {Object[]} - [{"name": "", "lastModified": ""}, ...]
 */
  get svgStats() {
    const chartEls = this.$('div.charts').find('div.chart');
    return chartEls.map((index, el) => {
      const fileUrl = this.$(el).children('object').attr('data');
      const fileName = path.basename(fileUrl);
      const lastModified = this.$(el).children('p')
        .eq(0)
        .children('small')
        .eq(0)
        .text();
      return {
        name: fileName,
        lastModified: lastModified
      }
    }).get();
  }

/**
 * @return {Object} - {csv: [], svg: []}
 */
  async start() {
    await this.fetch();
    this.parse();
    return {
      csvStats: this.csvStats,
      svgStats: this.svgStats
    }
  }
}

if (require.main == module) {
  const crawler = new CrawlHTML();
  crawler.start()
    .then(data => {
      console.log(`CSV: ${data.csvStats.length}`);
      console.log(`SVG: ${data.svgStats.length}`);
    })
    .catch(err => {
      console.log(err);
    });
}


module.exports = CrawlHTML;