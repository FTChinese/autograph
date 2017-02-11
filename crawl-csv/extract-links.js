const cheerio = require('cheerio');
const fs = require('mz/fs');

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

if (require.main === module) {
  fs.readFile('autograph.html')
    .then(content => {
      const datasets = extractData(content)
      return fs.writeFile('datasets.json', JSON.stringify(datasets, null, 4));
    })
    .catch(err => {
      console.log(err);
    });
}

module.exports = extractLinks;