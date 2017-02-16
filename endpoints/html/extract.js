const cheerio = require('cheerio');
const path = require('path');

function extract(html) {
  const $ = cheerio.load(html);
  const rowEls = $('table.datasets').children('tr');
  const chartEls = $('div.charts').children('.chart');

  const csvStats = rowEls.map((index, element) => {
    const tdEls = $(element).children('td');
    const csvName = tdEls.eq(0).children('a').text();
    const lastModified = tdEls.eq(1).text();
    return {
      "name": csvName,
      "lastModified": lastModified
    }
    return csvName;
  }).get();

  const svgTimestamps = {};
  chartEls.each((index, element) => {
    const svgUrl = $(element).children('object').attr('data');
    const svgName = path.basename(svgUrl);
    const lastModified = $(element).children('p')
      .eq(0)
      .children('small')
      .eq(0)
      .text();

    svgTimestamps[svgName] = lastModified;
  }).get();

  return {
    csvs: csvStats,
    svgTimestamps: svgTimestamps
  }
}

module.exports = extract;