const fs = require('fs-jetpack');
const path = require('path');
const co = require('co');
const got = require('got');

const buildArtifacts = require('../../util/build-artifacts.js');
const uri = require('../../util/uri.js');

const chartRender = require('./chart-render.js');


// The returned data will be used:
// 1. draw charts
// 2. Extract glossaries
function fetch(url) {
  console.log(`Fetching: ${url}`);
  return got(url, {
    json: true
  })
  .then(res => {
    return res.body;
  })
  .catch(err => {
    throw err;
  });
}

// function drawCharts() {
//   co(function *() {
//     console.log(`Start fetching data from ${configUrl}`);

//     const configs = yield got(configUrl, {
//         json: true
//       })
//       .then(res => {
//         return res.body;
//       });

//     yield writeJsonFile(configFile, configs);

//     console.log(`Data fetched. Starting render charts.`);
//     // translate here

//     const bilingualConfigs = yield translate(configs);
    
//     yield writeJsonFile(path.resolve(__dirname, '../public/config/config-bi.json'), bilingualConfigs);
    
//     yield Promise.all(bilingualConfigs.map(config => {
//       return chartRender(config)
//         .then(chart => {
//           console.log(`Writing svg ${config.title.en}`);
//           return fs.writeAsync(`${svgDir}/${slug(config.title.en)}.svg`, chart, 'utf8');
//         });
//     }));
//   })
//   .catch(err => {
//     console.log(err);
//   });
// }

if (require.main == module) {
  drawCharts();
}

module.exports = drawCharts;