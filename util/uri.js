const path = require('path');
// `publicDir` is used to save styles, and data used to render HTML.
const publicDir = exports.publicDir = path.resolve(__dirname, '../public');
// `chartDir` is used to save nightingale-config.json and rendered svg files.
// For development it is the same as publicDir.
const chartDir = exports.chartDir = process.env.CHART_DIR || publicDir;

/**
 * http://ig.ft.com/autograph the home page
 * http://ig.ft.com/autograph/data/<file.csv> the csv dir
 * http://ig.ft.com/autograph/config/nightingale-config.json svgs' data
 */
const autograph = exports.autograph = 'http://ig.ft.com/autograph';
const nightingale = exports.nightingale = `${autograph}/config/nightingale-config.json`;


// `public` in the current repo for dev, or specified in env var on server.
exports.graphicsDir = `${chartDir}/graphics`;
exports.svgConfig = `${chartDir}/config/${path.basename(nightingale)}`;

// `public` directory in the current repo
exports.csvStats = `${publicDir}/data/csv-stats.json`;
exports.svgStats = `${publicDir}/data/svg-stats.json`;
exports.chartStats = `${publicDir}/data/chart-stats.json`;
exports.lostCharts = `${publicDir}/data/lost-charts.json`;
exports.glossary = path.resolve(__dirname, `translate/en-cn.json`);
exports.chartStyle = path.resolve(__dirname, '../client/chart.css');