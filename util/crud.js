const fs = require('fs-jetpack');
const loadJsonFile = require('load-json-file');
const writeJsonFile = require('write-json-file');
const slug = require('speakingurl');
const filesize = require('filesize');
const uri = require('./uri.js');

exports.saveHomePage = async function(html) {
  return await fs.writeAsync(`${uri.storage}/index.html`, html);
};

exports.getSvgConfig = async function() {
  return await loadJsonFile(uri.svgConfig);
};

exports.saveSvgConfig = async function(json) {
  return await writeJsonFile(uri.svgConfig, json);
}

exports.saveSvgStats = async function(json) {
  return await writeJsonFile(uri.svgStats, json);
};

exports.getSvgStats = async function() {
  return await loadJsonFile(uri.svgStats);
};

exports.saveCsvStats = async function(json) {
  return await writeJsonFile(uri.csvStats, json);
};

exports.getCsvStats = async function() {
  return await loadJsonFile(uri.csvStats);
}

/*
 * @param {String} name - White space separated string. Pased from nightingale-config.json. You need to slugify it.
 */
exports.saveSvg = async function(name, svg) {
  const filename = `${slug(name)}.svg`;
  return await fs.writeAsync(`${uri.graphicsDir}/${filename}`, svg);
};

exports.getSvgSize = async function(filename) {
  const stat = await fs.inspectAsync(`${uri.graphicsDir}/${filename}`);
  return filesize(stat.size, {round: 0});
};

exports.saveGlossary = async function() {
  return await writeJsonFile(uri.glossary, json);
};

exports.getGlossary = async function() {
  return await loadJsonFile(uri.glossary);
};

