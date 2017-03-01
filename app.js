const serve = require('koa-static');
const Koa = require('koa');
const app = new Koa();
const logger = require('koa-logger');
const render = require('./util/render.js');
const buildArtifacts = require('./util/build-artifacts.js');
const styles = require('./util/styles.js');

// styles.build();
app.proxy = true;
app.use(logger());
app.use(serve('public', {
	index: false
}));

app.use(function *() {
	const today = new Date().toDateString();

	const {csvs, charts} = yield {
		csvs: buildArtifacts.getCsvStats(),
		charts: buildArtifacts.getSvgStats()
	};

	const context = {
		csvs: csvs.map(addIsToday),
		charts: charts.map(addIsToday)
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