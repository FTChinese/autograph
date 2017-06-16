const moment = require('moment-timezone');
const render = require('./render.js');
const buildArtifacts = require('./build-artifacts.js');
const minify = require('html-minifier');

// returns the html string to be used by Koa.
async function buildPage(env) {
  const [csvs, charts] = await Promise.all([
    buildArtifacts.getCsvStats(),
    buildArtifacts.getSvgStats()
  ]);

  const context = {
    publicUrl: encodeURIComponent(process.env.PUBLIC_URL),
    csvs: csvs.map(isToday),
    charts: charts.map(isToday),
    env
  }

  const html = await render('index.html', context);

  return minify(html, {
    collapseBooleanAttributes: true,
    collapseInlineTagWhitespace: true,
    collapseWhitespace: true,
    conservativeCollapse: true,
    removeComments: true,
    minifyCSS: true
  });
}

function isToday(o) {
  const timeZone = 'Asia/Shanghai';
  // Create a UTC time and explicitly convert to Beijing time.
  const today = moment.utc().tz(timeZone);
  // Convert modification time to Beijing time.
  const modifiedTime = moment.utc(new Date(o.lastModified)).tz(timeZone);

  return Object.assign({}, o, {
    isToday: modifiedTime.isSame(today, 'day'),
    lastModified: modifiedTime.format('YYYY年M月D日 HH:mm:ss')
  });
}


if (require.main == module) {
  buildPage()
    .then(html => {
      return buildArtifacts.saveIndexPage(html);
    })
    .catch(err => {
      console.log(err);
    });
}

module.exports = buildPage;