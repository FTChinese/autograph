const debug = require('debug')('ag:charts');
const crud = require('../util/crud.js');
const draw = require('./draw.js');
const styles = require('../util/styles.js');
const uri = require('../util/uri.js');

async function renderCharts(nightingale, svgStats) {
  const css = await styles(uri.chartStyle);

// Draw svg and save it
  const fileStats = new Map();
  
  await Promise.all(nightingale.map(async function(svg) {
    const svgStr = draw(svg, css);
    const {filename, size} = await crud.saveSvg(svg.title, svgStr);
    fileStats.set(filename, size);
    return Promise.resolve();
  }));

  const missing = [];

  for (let svg of svgStats) {
    const key = svg.name;
    const size = fileStats.get(key);
    if (!size) {
      missing.push(key);
    }
    Object.assign(svg, {size});
  }

  await crud.saveSvgStats(svgStats);
  return missing;
}

module.exports = renderCharts;