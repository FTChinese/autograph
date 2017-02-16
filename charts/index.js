const co = require('co');
const buildArtifacts = require('../util/build-artifacts.js');
const draw = require('./draw.js');
const styles = require('../util/styles.js');
const uri = require('../util/uri.js');

function renderChartsAndGetStats(data) {
  return styles.render(uri.chartScss, false)
      .then(result => {
        return result.css.toString().replace(/\n/g, '');
      })
      .then(css => {
        const promisedStats = data.map(datum => {
          return createSvgAndGetStat(datum, css);
        });
        return Promise.all(promisedStats);
      })
      .catch(err => {
        console.log(err);
      });

  function createSvgAndGetStat(datum, styles) {
    return draw(datum, styles)
      .then(svg => {
        return buildArtifacts.saveSvg(datum.title, svg)
      });
  }
}

function mergeStats(stats, timestamps) {
  return stats.map(stat => {
    const lastModified = timestamps[stat.name];
    return Object.assign({}, stat, {lastModified});
  });
}

/*
 * Data source needed:
 * 1. timestamp extracted from html for each svg
 * 2. chart style compiled from scss.
 * 
 */
function render(data, timestamps) {
  return renderChartsAndGetStats(data)
    .then(stats => {
      return mergeStats(stats, timestamps);
    })
    .then(stats => {
      return buildArtifacts.saveSvgStats(stats);
    })
    .catch(err => {
      console.log(err);
    });
}

if (require.main == module) {
    const co = require('co');
    const endpoints = require('../endpoints');

    co(function *() {
        let data = null;
        try {
            data = yield buildArtifacts.getSvgConfig();
        } catch (err) {
            data = yield endpoints.json();
        }
        const {svgTimestamps} = yield endpoints.html();
        yield render(data, svgTimestamps);
    })
    .catch(err => {
        throw err;
    });
}

module.exports = render;