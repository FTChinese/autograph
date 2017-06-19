const debug = require('debug')('ag:charts');
const crud = require('../util/crud.js');
const draw = require('./draw.js');
const styles = require('../util/styles.js');
const uri = require('../util/uri.js');

async function renderCharts(nightingale, svgStats) {
  const css = await styles(uri.chartStyle);

// Draw svg and save it
  const fileStats = new Map();
  
  // loop over each element in nightinggale-config.json to draw each svg
  // `savSvg`
  // Must use map here, not forEach
  await Promise.all(nightingale.map(async function(svg) {
    const svgStr = draw(svg, css);

    const {filename, size} = await crud.saveSvg(svg.title, svgStr);

    fileStats.set(filename, size);
    return Promise.resolve();
  }));

  const missing = [];

  const stats = svgStats.map(svg => {
    const key = svg.name
    const size = fileStats.get(key) || null;
    return Object.assign(svg, {size});
  })
  .filter(svg => {
    if (svg.size) {
      return true
    } else {
      missing.push(svg.name);
      return false;
    }
  });

  debug(`Missing svg: %O`, missing);

  await crud.saveSvgStats(stats);

  return missing;
}

module.exports = renderCharts;