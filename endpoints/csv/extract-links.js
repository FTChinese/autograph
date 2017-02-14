const cheerio = require('cheerio');

function extractLinks(html) {
  const $ = cheerio.load(html);
  const rowEls = $('table.datasets').children('tr');
  return rowEls.map((index, element) => {
    const tdEls = $(element).children('td')
    const csvName = tdEls.eq(0).children('a').text();
    const lastModified = tdEls.eq(1).text();
    return {
      "name": csvName,
      "lastModified": lastModified
    }
    return csvName;
  }).get();
}

module.exports = extractLinks;