const fs = require('fs-jetpack');
const path = require('path');
const co = require('co');
const got = require('got');
const extractLinks = require('./extract-links.js');

const baseUrl = 'http://ig.ft.com/autograph/';
const configFile = path.resolve(__dirname, '../public/config/csv-config.json');
const csvDir = path.resolve(__dirname, '../public/data');

function crawlCsv() {
  
  return co(function *() {
    console.log(`Start scraping ${baseUrl}`);
    const indexPage = yield got(baseUrl)
      .then(res => {
        return res.body;
      });
    
    console.log(`Extracting csv links`);
    const csvList = extractLinks(indexPage);

    console.log(`Saving file to ${configFile}`);
    yield fs.writeAsync(configFile, JSON.stringify(csvList, null, 4), 'utf8');

// fetch all csv files
    const promisedList = csvList.map(csv => {
      console.log(`Fetching: ${csv.name}`);
      return got(`${baseUrl}/data/${csv.name}`)
        .then(res => {
          console.log(`Saving ${csv.name}`);
          return fs.writeAsync(`${csvDir}/${csv.name}`, res.body, 'utf8');
        });
    });

    yield Promise.all(promisedList);

    return csvList;
  })
  .catch(err => {
    console.log(err);
  });
}

if (require.main == module) {
  crawlCsv();
}

module.exports = crawlCsv;