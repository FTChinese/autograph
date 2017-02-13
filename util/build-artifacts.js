const fs = require('fs-jetpack');
const loadJsonFile = require('load-json-file');
const writeJsonFile = require('write-json-file');
const path = require('path');
const slug = require('speakingurl');

const uri = require('./uri.js');

const publicDir = path.resolve(__dirname, '../public');
const glossaryDir = path.resolve(__dirname, '../glossary');

const graphicsDir = `${publicDir}/graphics`;
const dataDir = `${publicDir}/data`;
const configDir = `${publicDir}/config`;

const csvStatsFile = `${configDir}/csv-stats.json`;
const svgConfigFile = `${configDir}/${path.basename(uri.svgConfig)}`;
const glossaryFile = `${glossaryDir}/en-cn.json`;

module.exports = {
    saveSvg: function (name, svgString) {
        return fs.writeAsync(`${graphicsDir}/${slug(name)}.svg`, svgString, 'utf8');
    },

    saveSvgConfig: function (json) {
        return writeJsonFile(svgConfigFile, json);
    },

    getSvgConfig: function () {
        return loadJsonFile(svgConfigFile)
    },

    saveCsv: function (filename, csvString) {
        const dest = `${dataDir}/${filename}`;
        console.log(`Saving: ${dest}`);
        return fs.writeAsync(dest, csvString, 'utf8');
    },

    saveCsvStats: function (json) {
        console.log(`Saving csv stats: ${csvStatsFile}`);
        return writeJsonFile(csvStatsFile, json);
    },

    getCsvConfig: function () {
        return loadJsonFile(csvStatsFile);
    },

    saveGlossary: function (json) {
        return writeJsonFile(glossaryFile, json);
    },

    getGlossary: function () {
        return loadJsonFile(glossaryFile);
    },

    saveTemp: function (filename, content) {
        return fs.writeAsync(`${path.resolve(__dirname, '../.tmp')}/${filename}`, content, 'utf8');
    }
}
