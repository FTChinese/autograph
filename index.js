const fs = require('fs-jetpack');
const jsdom = require('jsdom');
const d3 = require('d3');

jsdom.env({
  html: '<html><body></body></html>',
  features: { QuerySelector: true },
})