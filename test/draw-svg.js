const crud = require('../util/crud.js');
const draw = require('../charts/draw.js');

async function drawGraphics() {
  const config = await crud.getSvgConfig();
  const stats = await Promise.all(config.map(async function(svgConfig) {
    const svg = await draw(svgConfig);
    return await crud.saveSvg(svgConfig.title, svg);
  }))

  console.log(stats);
}

drawGraphics()
  .catch(err => {
    console.log(err);
  });