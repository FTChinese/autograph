const fs = require('fs-jetpack');
const path = require('path');
const postcss = require('postcss');
const nested = require('postcss-nested');
const cssvariables = require('postcss-css-variables');
const cssnext = require('postcss-cssnext');

async function styles(input) {
  const src = path.resolve(process.cwd(), input);
  const mycss = await fs.readAsync(src);
  console.log(`Processing ${src}...`);

  const result = postcss([
      nested(),
      cssvariables()
    ])
    .process(mycss)
    .css;

  
  console.log(`Generated ${dest}`);
  await 

  return result;
}

if (require.main === module) {
  styles('client/chart.css')
    .then(result => {
      return fs.writeAsync('public/styles/chart.css', result);
    })
    .catch(err => {
      console.log(err);
    });
}

module.exports = styles;