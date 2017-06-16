const debug = require('debug')('ag:server');
const serve = require('koa-static');
const Koa = require('koa');
const app = new Koa();
const logger = require('koa-logger');
const buildPage = require('./util/build-page.js');
const uri = require('./util/uri.js');
const handleErrors = require('./server/handle-errors.js');

const env = {
  isProduction: app.env === 'production',
	static: 'http://interactive.ftchinese.com/'
};

app.proxy = true;
app.use(logger());
app.use(serve(uri.publicDir, {
	index: false
}));

app.use(handleErrors);

app.use(async (ctx) => {
	ctx.body = await buildPage(env);
});

const server = app.listen(process.env.PORT || 4000)
server.on('listening', () => {
	console.log(`Client listening on port ${process.env.PORT || 4000}`);
});
// Logging server error.
server.on('error', (error) => {
  debug('Server error');
});