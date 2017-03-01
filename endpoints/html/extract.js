const cheerio = require('cheerio');
const path = require('path');


/**
 * @param {String} html - Contents scraped from ig.ft.com/autograph
 * @returns {Object}
 * {
 *  csvs: [
 *    {
 *      name: "cn-interbank.csv",
 *      lastModified: "Mon, 20 Feb 2017 02:06:13 GMT"
 *    }
 *  ],
 *  svgTimestamps: {
 *    "unemployment-rate.svg": "Wed, 15 Feb 2017 13:20:51 GMT"
 *  }
 * }   
 */
function extract(html) {
  const $ = cheerio.load(html);
  const rowEls = $('table.datasets').children('tr');
  const chartEls = $('div.charts').children('.chart');

  const csvStats = rowEls.map((index, element) => {
    const tdEls = $(element).children('td');
    const firstTdEl = tdEls.eq(0);
    const csvName = firstTdEl.children('a').text();
    const size = firstTdEl.clone().children().remove().end().text();
    const lastModified = tdEls.eq(1).text();
    return {
      "name": csvName,
      "size": size.trim(),
      "lastModified": lastModified
    }
  }).get();

  const svgStats = chartEls.map((index, element) => {
    const svgUrl = $(element).children('object').attr('data');
    const svgName = path.basename(svgUrl);
    const lastModified = $(element).children('p')
      .eq(0)
      .children('small')
      .eq(0)
      .text();
    return {
      name: svgName,
      size: "",
      lastModified: lastModified
    }
  }).get();

  return {
    csv: csvStats,
    svg: svgStats
  }
}

module.exports = extract;