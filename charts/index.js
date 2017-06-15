const debug = require('debug')('ag:charts');
const buildArtifacts = require('../util/build-artifacts.js');
const draw = require('./draw.js');
const styles = require('../util/styles.js');
const uri = require('../util/uri.js');

async function updateStats() {
// There are some discrepancies between the length of `nightingale-config.json` and the number of SVGs exhibited on `ig.ft.com/autograph`. 
// `nightingale-config.json` has fewer.
    const missingSvgs = [];
// Get the stats extracted from HTML
    const svgStats = await buildArtifacts.getSvgStats();

    debug(`Number of SVGs on ig.ft.com/autograph: ${svgStats.length}`);

    async function getFileSize(stat) {
      try {
        const size = await buildArtifacts.getSvgSize(stat.name);
        return Object.assign({}, stat, {size});
      } catch(err) {
        missingSvgs.push(stat.name);
        return null;
      }
    }
    const statsWithSize = await Promise.all(getFileSize);

// Filter the empty element.
    const actualStats = statsWithSize.filter(element => {
      return !!element;
    });

    debug(`SVGs atually generated: ${actualStats.length}`);

    debug(`"nightingale-config.json" has ${missingSvgs.length} SVGs missed:`);
    debug(missingSvgs);

    return actualStats;
}

async function renderCharts() {
// Read `nightingale-config.json` and the compile css.    
  const svgConfig = await buildArtifacts.getSvgConfig();

  const css = await styles.render(uri.chartScss, false)
    .then(result => {
// Only use css. Discard map. Remove any newline.
      return result.css.toString().replace(/\n/g, '');
    });

// Draw svg and save it
  await Promise.all(svgConfig.map(async function(svg) {
    const result = await draw(svg, css)
    return await buildArtifacts.saveSvg(svg.title, result);
  }));

// After the svg is updated and written, use `fs.stat` to get the file's size, and merge it into `svg-stats.json`
  const svgStats = await updateStats();
  await buildArtifacts.saveSvgStats(svgStats);
}

if (require.main == module) {
    renderCharts()
      .catch(err => {
        console.error(err);
      });
}

module.exports = renderCharts;