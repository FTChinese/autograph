const fs = require('mz/fs');
const jsdom = require('jsdom');

fs.readFile('crawler/autograph.html', 'utf8')
  .then(data => {
    jsdom.env(data, (err, window) => {
      console.log(window.document);
    });    
  })
  .catch(err => {
    console.log(err);
  });

