const render = require('./render.js');
const styles = require('./styles.js');
const buildArtifacts = require('./build-artifacts.js');

// returns the html string to be used by Koa.
async function buildPage() {
  try {
    const [csvs, charts] = await Promise.all([
      buildArtifacts.getCsvStats(),
		  buildArtifacts.getSvgStats()
    ]);

    const context = {
      publicUrl: encodeURIComponent(process.env.PUBLIC_URL),
      csvs: csvs.map(isToday),
      charts: charts.map(isToday)
    }

    const html = await render('index.html', context);

    return html;
  } catch (e) {
    console.log(e);
  }
}

function isToday(o) {
  const today = getUTCDateString(new Date());
  const modifiedDate = getUTCDateString(new Date(o.lastModified));

  return Object.assign(o, {
    isToday: modifiedDate === today ? true : false
  });
}

function getUTCDateString(date) {
  return `${date.getUTCFullYear()}${date.getUTCMonth() + 1}${date.getUTCDate()}`
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