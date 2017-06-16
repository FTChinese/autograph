const debug = require('debug')('ag:charts');
const crud = require('../util/crud.js');
const draw = require('./draw.js');
const styles = require('../util/styles.js');
const uri = require('../util/uri.js');

async function renderCharts(nightingale, svgStats) {
  const css = await styles(uri.chartStyles);

// Draw svg and save it
  const fileStats = await Promise.all(nightingale.map(async function(svg) {
    const result = await draw(svg, css)
    return await crud.saveSvg(svg.title, result);
  }));

  const stats = fileStats.reduce((o, file) => {
    return o[file.filename] = file.size;
  }, {});

  svgStats.forEach(svg => {
    const key = svg.name;
    const size = stats.hasOwnProperty(key) ? stats[key] : null
    Object.assign(svg, {size});
  });

  await crud.saveSvgStats(svgStats);

  const groups = svgStats.reduce((o, svg) => {
    if (svg.size) {
      o.exists.push(svg);
    } else {
      o.missing.push(svg);
    }
  }, {exists: [], missing: []})
}

if (require.main == module) {
  renderCharts()
    .catch(err => {
      console.error(err);
    });
}

module.exports = renderCharts;