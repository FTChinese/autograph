// const path = require('path');
const serve = require('koa-static');
const koa = require('koa');
const app = koa();
const logger = require('koa-logger');
// const mount = require('koa-mount');
const error = require('koa-error');
const loadJsonFile = require('load-json-file');
// const bodyParser = require('koa-bodyparser');
// const index = require('./server/index.js');
const render = require('./util/render.js');
const buildArtifacts = require('./util/build-artifacts.js');
const styles = require('./util/styles.js');

// styles.build();
function compare(a, b) {
	return Date.parse(b.lastModified) - Date.parse(a.lastModified);
}
app.use(serve('public', {
	index: false
}));

app.use(logger());
// app.use(bodyParser());

// app.use(mount('/', index));

app.use(function *() {
	const today = new Date().toDateString();

	const {csvs, charts} = yield {
		csvs: buildArtifacts.getCsvStats(),
		charts: buildArtifacts.getSvgStats()
	};

	const context = {
		csvs: csvs.sort(compare).map(addIsToday),
		charts: charts.sort(compare).map(addIsToday)
	}

	this.body = yield render('index.html', context);

	function addIsToday(o) {
		const modifiedDate = new Date(o.lastModified).toDateString();
		return Object.assign(o, {
			isToday: modifiedDate === today ? true : false
		});
	}
});

const server = app.listen(process.env.PORT || 3000)
server.on('listening', () => {
	console.log(`Client listening on port ${process.env.PORT || 3000}`);
});