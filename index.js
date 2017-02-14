const crawl = require('./endpoints');
const chartsRender = require('./charts');

crawl.csv()
    .catch(err => {
        throw err;
    });

crawl.json()
    .then(data => {
        return chartsRender(data);
    })
    .catch(err => {
        throw err;
    });



