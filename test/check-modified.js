const got = require('got');
const uri = require('../util/uri.js');

got(uri.nightingale, {
  json: true,
  method: 'HEAD',
  headers: {
    'Last-Modified-Since': 'Mon, 19 Jun 2017 02:50:31 GMT'
  }
})
.then(res => {
  console.log(res.headers);
  console.log(res.statusCode);
  console.log(res.statusMessage);
})
.catch(err => {
  console.log(err);
});