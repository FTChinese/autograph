// const crawlCsv = require('./crawl-csv');
// const drawCharts = require('./draw-charts');

// crawlCsv();
// drawCharts();
const got = require('got');
const url = require('url');

const o = {
    index: 'http://ig.ft.com/autograph/',
    get svgConfig() {
        return `${this.index}config/nightingale-config.json`
    },
};

// got('http://ig.ft.com/autograph/')
//     .then(res => {
//         console.log(res.headers);
//     })
// got('http://ig.ft.com/autograph/data/us-10yr-treasury.csv')
//     .then(res => {
//         console.log(res.headers);
//     });

const csv = url.resolve('http://ig.ft.com/autograph/', 'data');
console.log(csv);

const file = url.resolve(csv, 'us-10yr-treasury.csv');

console.log(file);