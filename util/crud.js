const debug = require('debug')('ag:crud');
const fs = require('fs-jetpack');
const loadJsonFile = require('load-json-file');
const writeJsonFile = require('write-json-file');
const slug = require('speakingurl');
const filesize = require('filesize');
const uri = require('./uri.js');

// exports.saveHomePage = async function(html) {
//   return await fs.writeAsync(`${uri.buildDir}/index.html`, html);
// };

// exports.saveSvgConfig = async function(json) {
//   debug(`Saving ${uri.svgConfig}`);
//   return await writeJsonFile(uri.svgConfig, json);
// }

exports.getSvgConfig = async function() {
  debug(`Getting ${uri.svgConfig}`);
  return await loadJsonFile(uri.svgConfig);
}

exports.saveSvgStats = async function(json) {
  debug(`Saving ${uri.svgStats}`);
  return await writeJsonFile(uri.svgStats, json);
};

exports.getSvgStats = async function() {
  debug(`Getting ${uri.svgStats}`);
  return await loadJsonFile(uri.svgStats);
}

exports.saveCsvStats = async function(json) {
  debug(`Saving ${uri.csvStats}`);
  return await writeJsonFile(uri.csvStats, json);
};

exports.getCsvStats = async function() {
  debug(`Getting ${uri.csvStats}`);
  return await loadJsonFile(uri.csvStats);
}

/*
 * @param {String} name - White space separated string. Pased from nightingale-config.json. You need to slugify it.
 * @param {String} svg - The svg string.
 * @return {Object}
 * @property {String} filename
 * @property {Number} size 
 */
exports.saveSvg = async function(name, svg) {
  const filename = `${slug(name)}.svg`;
  const dest = `${uri.graphicsDir}/${filename}`;
  debug(`Saving ${dest}`);
  await fs.writeAsync(dest, svg);
  return {filename, size: filesize(Buffer.byteLength(svg), {round: 0})};
};

exports.saveGlossary = async function() {
  return await writeJsonFile(uri.glossary, json);
};

exports.getGlossary = async function() {
  return await loadJsonFile(uri.glossary);
};

