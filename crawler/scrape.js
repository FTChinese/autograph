const fs = require('mz/fs');
const path = require('path');
const got = require('got');

const baseUrl = 'http://ig.ft.com/autograph';


fs.readFile(path.resolve(__dirname, 'datasets.json'))
  .then(data => {
    return JSON.parse(data);
  })
  .then(datasets => {
    return Promise.all(datasets.map(item => {
      return got(`${baseUrl}/data/${item.name}`)
        .then(res => {
          return res.body
        })
        .then(body => {
          return fs.writeFile(path.resolve(process.cwd(), `data/${item.name}`), body, 'utf8');
        });
    }));
  })
  .catch(err => {
    console.log(err);
  });
