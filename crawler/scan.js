const fs = require('mz/fs');
const got = require('got');

const baseUrl = 'http://ig.ft.com/autograph/';

got('http://ig.ft.com/autograph/')
  .then(res => {
    return res.body;
  })
  .then(body => {
    fs.writeFile('autograph.html', body, 'utf8');
  })
  .catch(err => {
    console.log(err);
  });