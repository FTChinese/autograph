const _ = require('lodash');
const chalk = require('chalk');
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

    console.log(chalk.red(`\nNumber of SVGs on ig.ft.com/autograph: ${svgStats.length}`));

    const statsWithSize = await Promise.all(svgStats.map(stat => {
      return buildArtifacts.getSvgSize(stat.name)
        .then(size => {
          return Object.assign({}, stat, {size});
        })
        .catch(err => {
// If `getSvgSize` throws an error, catch it and replace the current element with {}.
          missingSvgs.push(stat.name);
          return {};
        });
    }));

// Filter the empty element.
    const actualStats = statsWithSize.filter(element => {
      return !(_.isEmpty(element));
    });

    console.log(chalk.red(`SVGs atually generated: ${actualStats.length}`));

    console.log(chalk.red(`\n"nightingale-config.json" has ${missingSvgs.length} SVGs missed:`));
    console.log(missingSvgs);

    return actualStats;
}

async function renderCharts() {
  try {
// Read `nightingale-config.json` and the compile css.    
    const svgConfig = await buildArtifacts.getSvgConfig();

    const css = await styles.render(uri.chartScss, false)
      .then(result => {
// Only use css. Discard map. Remove any newline.
        return result.css.toString().replace(/\n/g, '');
      });

// Draw svg and save it
    await Promise.all(svgConfig.map(svg => {
      return draw(svg, css)
        .then(result => {
          return buildArtifacts.saveSvg(svg.title, result);
        })
        .catch(err => {
          return err;
        });
    }));

// After the svg is updated and written, use `fs.stat` to get the file's size, and merge it into `svg-stats.json`
    const svgStats = await updateStats();
    await buildArtifacts.saveSvgStats(svgStats);

  } catch (e) {
    throw e;
  }
}

if (require.main == module) {
    renderCharts()
      .catch(err => {
        console.error(err);
      });
}

module.exports = renderCharts;