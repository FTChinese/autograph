const fs = require('fs-jetpack');
const loadJsonFile = require('load-json-file');
const writeJsonFile = require('write-json-file');
const path = require('path');
const slug = require('speakingurl');
const filesize = require('filesize');

const uri = require('./uri.js');

const publicDir = path.resolve(__dirname, '../public');
const glossaryDir = path.resolve(__dirname, '../glossary');

const graphicsDir = `${publicDir}/graphics`;
const dataDir = `${publicDir}/data`;
const configDir = `${publicDir}/config`;

const csvStatsFile = `${configDir}/csv-stats.json`;
const svgStatsFile = `${configDir}/svg-stats.json`;
const svgConfigFile = `${configDir}/${path.basename(uri.svgConfig)}`;
const glossaryFile = `${glossaryDir}/en-cn.json`;

function humanReadableSize(str) {
    const size = Buffer.byteLength(str);
    return filesize(size, {round: 0});
}

module.exports = {
// return an object containing svg's filename and its size.
    saveSvg: function (name, svgString) {
        const filename = `${slug(name)}.svg`;
        console.log(`Saving SVG: ${filename}`);
        return fs.writeAsync(`${graphicsDir}/${filename}`, svgString, 'utf8')
            .then(() => {
                return {
                    name: filename,
                    size: humanReadableSize(svgString)
                };
            });
    },

    getSvgConfig: function () {
        return loadJsonFile(svgConfigFile);
    },

    saveSvgConfig: function (json) {
        console.log(`Saving svg config: ${svgConfigFile}`);
        return writeJsonFile(svgConfigFile, json)
            .then(() => {
                return json;
            });
    },

    saveSvgStats: function (json) {
        console.log(`Saving svg stats: ${svgStatsFile}`);
        return writeJsonFile(svgStatsFile, json);
    },

    getSvgStats: function() {
        return loadJsonFile(svgStatsFile);
    },

// It returns a promise resovled to the filesize written.
    saveCsv: function (filename, csvString) {
        const dest = `${dataDir}/${filename}`;
        console.log(`Saving: ${dest}`);
        return fs.writeAsync(dest, csvString, 'utf8')
            .then(() => {
                return humanReadableSize(csvString);
            });
    },

    saveCsvStats: function (json) {
        console.log(`Saving csv stats: ${csvStatsFile}`);
        return writeJsonFile(csvStatsFile, json);
    },

    getCsvStats: function () {
        return loadJsonFile(csvStatsFile);
    },

// Handle glossary
    saveGlossary: function (json) {
        return writeJsonFile(glossaryFile, json);
    },

    getGlossary: function () {
        return loadJsonFile(glossaryFile)
// If the file does not exists, return an empty object.
            .catch(err => {
                return {};
            });
    },

    saveTemp: function (filename, content) {
        return fs.writeAsync(`${path.resolve(__dirname, '../.tmp')}/${filename}`, content, 'utf8');
    }
}
