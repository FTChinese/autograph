const fs = require('fs-jetpack');
const path = require('path');
const co = require('co');
const got = require('got');
const slug = require('speakingurl');
const chartRender = require('./chart-render.js');
const configUrl = 'http://ig.ft.com/autograph/config/nightingale-config.json';
const svgDir = path.resolve(__dirname, '../public/graphics');
const configFile = path.resolve(__dirname, '../public/config', path.basename(configUrl));

function drawCharts() {
  co(function *() {
    console.log(`Start fetching data from ${configUrl}`);

    const configs = yield got(configUrl, {
        json: true
      })
      .then(res => {
        return res.body;
      });

    yield fs.writeAsync(configFile, JSON.stringify(configs), 'utf8');

    console.log(`Data fetched. Starting render charts.`);
    // translate
    yield Promise.all(configs.map(config => {
      return chartRender(config)
        .then(chart => {
          console.log(`Writing svg ${config.title}`);
          return fs.writeAsync(`${svgDir}/${slug(config.title)}.svg`, chart, 'utf8');
        });
    }));
  })
  .catch(err => {
    console.log(err);
  });
}

if (require.main == module) {
  drawCharts();
}

module.exports = drawCharts;