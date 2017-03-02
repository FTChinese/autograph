const sass = require('node-sass');
const path = require('path');
const buildArtifacts = require('./build-artifacts.js');
const uri = require('./uri.js');

function render(src) {
  return new Promise(function(resolve, reject) {
    sass.render({
      file: src,
      outputStyle: 'compressed',
      sourceMap: true,
      outFile: `${path.basename(src, '.scss')}.css`
    }, (err, result) => {
      if (err) {
          reject(err);
      } else {
          resolve(result);
      }  
    });
  });
}

function build(src=uri.mainScss) {
  const name = path.basename(src, '.scss');
  console.log(`Compiling SCSS file: ${src}`);
  return render(src)
    .then(result => {
        return buildArtifacts.saveStyles(name, result);
    })
    .catch(err => {
      throw err;
    });
}

if (require.main == module) {
  build()
    .catch(err => {
        console.log(err);
    });
}

module.exports = {
	render: render,
	build: build
}