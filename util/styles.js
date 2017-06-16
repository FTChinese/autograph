const fs = require('fs-jetpack');
const path = require('path');
const postcss = require('postcss');
const nested = require('postcss-nested');
const cssvariables = require('postcss-css-variables');
const cssnext = require('postcss-cssnext');

async function styles(input, output) {
  const src = path.resolve(process.cwd(), input);
  const dest = path.resolve(process.cwd(), output);
  const mycss = await fs.readAsync(src);
  console.log(`Processing ${src}...`);

  const result = postcss([
      nested(),
      cssvariables()
    ])
    .process(mycss)
    .css;
  console.log(`Geerated ${dest}`);
  await fs.writeAsync(dest, result);
}

if (require.main === module) {
  styles('client/chart.css', 'public/styles/chart.css')
    .catch(err => {
      console.log(err);
    });
}

module.exports = styles;