const postcss = require('postcss');
const cssnext = require('postcss-cssnext');
const cssvariables = require('postcss-css-variables');
const fs = require('fs-jetpack');

async function css() {
  const mycss = await fs.readAsync('client/chart-styles.css');
  const output = postcss([
    cssvariables()
  ])
  .process(mycss)
  .css;
  console.log(output)
  await fs.writeAsync('.tmp/test.css', output);
}

if (require.main === module) {
  css()
    .catch(err => {
      console.log(err);
    });
}