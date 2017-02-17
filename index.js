const co = require('co');
const endpoints = require('./endpoints');
const chartsRender = require('./charts');

function autoGraph() {
  return co(function*() {
// Fetch the HTML and extract data from it
    const { csvs, svgTimestamps } = yield endpoints.fetchHtml();
// Parrallel scraping of all csv files and nightingale-config.json.        
    const [, svgConfigs] = yield [
        endpoints.fetchCsv(csvs),
        endpoints.fetchJson()
    ];
// Use nightingale-config.json to render svg.
// Use svgTimestamps scraped from HTML to build statistics of the svg to be used by server.        
    yield chartsRender(svgConfigs, svgTimestamps);
  })
  .catch(err => {
      console.log(err);
  });
}

if (require.main == module) {
    autoGraph();
}

module.exports = autoGraph;