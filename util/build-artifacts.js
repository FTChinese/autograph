const fs = require('fs-jetpack');
const loadJsonFile = require('load-json-file');
const writeJsonFile = require('write-json-file');
const path = require('path');
const slug = require('speakingurl');
const filesize = require('filesize');

const uri = require('./uri.js');

const publicDir = path.resolve(process.cwd(), process.env.PUBLIC_DIR ? process.env.PUBLIC_DIR : 'public');

const glossaryDir = path.resolve(process.cwd(), 'glossary');
const graphicsDir = `${publicDir}/graphics`;
const dataDir = `${publicDir}/data`;
const configDir = `${publicDir}/config`;
const cssDir = `${publicDir}/styles`;

const csvStatsFile = `${configDir}/csv-stats.json`;
const svgStatsFile = `${configDir}/svg-stats.json`;
const svgConfigFile = `${configDir}/${path.basename(uri.svgConfig)}`;
const svgTimestampFile = `${configDir}/svg-timestamp.json`;
const glossaryFile = `${glossaryDir}/en-cn.json`;

// function humanReadableSize(str) {
//     const size = Buffer.byteLength(str);
//     return filesize(size, {round: 0});
// }

module.exports = {
// Handle svg files.
    getSvgConfig: function () {
        return loadJsonFile(svgConfigFile)
          .catch(err => {
            throw err;
          });
    },

    saveSvgConfig: function (json) {
      console.log(`Saving SVG config: ${svgConfigFile}`);
      return writeJsonFile(svgConfigFile, json);
    },

// Save a single svg
/*
 * @param {String} name - White space separated string. Pased from nightingale-config.json. You need to slugify it.
 */
    saveSvg: function (name, svgString) {        
      const filename = `${slug(name)}.svg`;
      console.log(`Saving SVG: ${filename}`);
      return fs.writeAsync(`${graphicsDir}/${filename}`, svgString);
    },

    getSvgSize: function (filename) {
      // console.log(`Get SVG Size: ${graphicsDir}/${filename}`);
      return fs.inspectAsync(`${graphicsDir}/${filename}`)
        .then(stat => {
// If file does not exist, stat === undefined.
// Then throw the error to be catched by the next step.
          return filesize(stat.size, {round: 0});
        })
        .catch(err => {
          throw err;
        });
    },

    saveSvgStats: function (json) {
      console.log(`Saving SVG stats: ${svgStatsFile}`);
      return writeJsonFile(svgStatsFile, json)
        .catch(err => {
          throw err;
        });
    },

    getSvgStats: function() {
      console.log(`Loading ${svgStatsFile}`)
      return loadJsonFile(svgStatsFile);
    },

// Handle csv files
    saveCsv: function (filename, csvString) {
      const dest = `${dataDir}/${filename}`;
      console.log(`Saving: ${dest}`);
      return fs.writeAsync(dest, csvString);
    },

    saveCsvStats: function (json) {
      console.log(`Saving CSV stats: ${csvStatsFile}`);
      return writeJsonFile(csvStatsFile, json);
    },

    getCsvStats: function () {
      console.log(`Loading ${csvStatsFile}`);
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

    saveStyles: function(name, result) {
      const filename = `${cssDir}/${name}.css`;
      console.log(`Saving styles ${filename}`);
      return Promise.all([
        fs.writeAsync(filename, result.css),
        fs.writeAsync(`${filename}.map`, result.map)
      ]);
    },

    saveIndexPage: function(html) {
      return fs.writeAsync(`${publicDir}/index.html`, html)
        .catch(err => {
          throw err;
        })
    },

    saveTemp: function (filename, content) {
      return fs.writeAsync(`${path.resolve(__dirname, '../.tmp')}/${filename}`, content);
    }
};
