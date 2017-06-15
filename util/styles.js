const pify = require('pify');
const sass = pify(require('node-sass').render);
const path = require('path');
const uri = require('./uri');

async function styles(src=uri.chartScss) {
  const result =  await sass({
    file: src,
    includePaths: ['bower_components'],
    outputStyle: 'compressed',
    precision: 10
  });
  return result.css.toString();
}

if (require.main == module) {
  css()
    .catch(err => {
        console.log(err);
    });
}

module.exports = styles;