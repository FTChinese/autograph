const path = require('path');
const publicDir = exports.publicDir = path.resolve(process.cwd(), process.env.PUBLIC_DIR || 'public');
const buildDir = exports.buildDir = path.resolve(process.cwd(), 'build');
/**
 * http://ig.ft.com/autograph the home page
 * http://ig.ft.com/autograph/data/<file.csv> the csv dir
 * http://ig.ft.com/autograph/config/nightingale-config.json svgs' data
 */
const autograph = exports.autograph = 'http://ig.ft.com/autograph';
const nightingale = exports.nightingale = `${autograph}/config/nightingale-config.json`;


// `public` in the current repo for dev, or specified in env var on server.
exports.graphicsDir = `${publicDir}/graphics`;
exports.svgConfig = `${publicDir}/config/${path.basename(nightingale)}`;

// `public` directory in the current repo
exports.csvStats = `${buildDir}/data/csv-stats.json`;
exports.svgStats = `${buildDir}/data/svg-stats.json`;
exports.glossary = path.resolve(__dirname, `translate/en-cn.json`);
exports.chartStyle = path.resolve(__dirname, '../client/chart.css');