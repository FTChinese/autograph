const got = require('got');
const fs = require('fs-jetpack');
const slug = require('speakingurl');
const configUrl = 'http://ig.ft.com/autograph/config/nightingale-config.json';


got(configUrl, {
    json: true
  })
  .then(res => {
    return res.body;
  })
  .then(data => {
    return fs.writeAsync(`config.json`, JSON.stringify(data), 'utf8');
  })
  .catch(err => {
    console.log(err);
  });

