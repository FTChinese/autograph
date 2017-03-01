const render = require('./render.js');
const buildArtifacts = require('./build-artifacts.js');
const styles = require('./styles.js');

const today = new Date().toDateString();

async function buildList() {
  try {
    const [csvs, charts] = await Promise.all([
      buildArtifacts.getCsvStats(),
		  buildArtifacts.getSvgStats()
    ]);

    const context = {
      csvs: csvs.map(addIsToday),
      charts: charts.map(addIsToday)
    }

    const html = await render('index.html', context);

    return html;
  } catch (e) {
    console.log(e);
  }
}

function addIsToday(o) {
  const modifiedDate = new Date(o.lastModified).toDateString();
  return Object.assign(o, {
    isToday: modifiedDate === today ? true : false
  });
}

if (require.main = module) {
  buildList()
    .then(html => {
      return buildArtifacts.saveIndexPage(html);
    })
    .catch(err => {
      console.log(err);
    });
}

module.exports = buildList;