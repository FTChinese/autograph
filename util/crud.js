const fs = require('fs-jetpack');
const loadJsonFile = require('load-json-file');
const writeJsonFile = require('write-json-file');
const slug = require('speakingurl');
const filesize = require('filesize');
const uri = require('./uri.js');

exports.saveHomePage = async function(html) {
  return await fs.writeAsync(`${uri.storage}/index.html`, html);
};

exports.saveSvgConfig = async function(json) {
  return await writeJsonFile(uri.svgConfig, json);
}

exports.getSvgConfig = async function() {
  return await loadJsonFile(uri.svgConfig);
}

exports.saveSvgStats = async function(json) {
  return await writeJsonFile(uri.svgStats, json);
};

exports.getSvgStats = async function() {
  return await loadJsonFile(uri.svgStats);
}

exports.saveCsvStats = async function(json) {
  return await writeJsonFile(uri.csvStats, json);
};

/*
 * @param {String} name - White space separated string. Pased from nightingale-config.json. You need to slugify it.
 */
exports.saveSvg = async function(name, svg) {
  const filename = `${slug(name)}.svg`;
  await fs.writeAsync(`${uri.graphicsDir}/${filename}`, svg);
  return {filename, size: filesize(Buffer.byteLength(svg), {round: 0})};
};

exports.saveGlossary = async function() {
  return await writeJsonFile(uri.glossary, json);
};

exports.getGlossary = async function() {
  return await loadJsonFile(uri.glossary);
};

