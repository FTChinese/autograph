const fs = require('fs-jetpack');
const path = require('path');
const postcss = require('postcss');
const mixins = require('postcss-mixins');
const cssvariables = require('postcss-css-variables');
const nested = require('postcss-nested');
const cssnext = require('postcss-cssnext');

async function css() {
  const src = path.resolve(__dirname, '../client/chart-styles.css');
  const dest = path.resolve(__dirname, '../.tmp/chart-styles.css');
  const mycss = await fs.readAsync(src);

  const output = postcss([
      mixins(),
      cssvariables(),
      nested()
    ])
    .process(mycss)
    .css;
  console.log(output)
  await fs.writeAsync(dest, output);
}

if (require.main === module) {
  css()
    .catch(err => {
      console.log(err);
    });
}