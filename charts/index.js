const debug = require('debug')('ag:charts');
const crud = require('../util/crud.js');
const draw = require('./draw.js');
const styles = require('../util/styles.js');
const uri = require('../util/uri.js');

/**
 * Render svg with nightingale data. Fill in the `size` field in each entry of svgStats
 * @param {*} nightingale 
 * @param {*} svgStats 
 */

class Charts {
  constructor(styleFile=uri.chartStyle) {
    this.styleFile = styleFile;
    this.svgSizes = new Map();
  }

  render(data) {
    const css = await styles(this.styleFile);

    await Promise.all(data.map(async (svg) => {
      const svgStr = draw(svg, css);
      const {filename, size} = await crud.saveSvg(svg.title, svgStr);
      this.svgSizes.set(filename, size);
      return;
    }));
  }
}
async function renderCharts(nightingale, svgStats) {
  const css = await styles(uri.chartStyle);

  // `fileStats` stores the size of each generated svg file.
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

  // Merge the actual filesize into svgStats
  const stats = svgStats.map(svg => {
    const key = svg.name
    const size = fileStats.get(key) || null;
    return Object.assign(svg, {size});
  })
  // If any of the element of the array does not have `size`, then this file is no generated.
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