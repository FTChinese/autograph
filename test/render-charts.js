const charts = require('../charts');
const crud = require('../util/crud.js');

async function renderCharts() {
  const config = await crud.getSvgConfig();
  const svgStats = await crud.getSvgStats();
  const missing = await charts(config, svgStats);
  console.log(missing);
}

renderCharts()
  .catch(err => {
    console.log(err);
  });