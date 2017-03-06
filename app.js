const serve = require('koa-static');
const Koa = require('koa');
const app = new Koa();
const logger = require('koa-logger');
const buildPage = require('./util/build-page.js');
const styles = require('./util/styles.js');

styles.build()
	.then(() => {
		console.log('Server compiled SCSS on startup.');
	})
  .catch(err => {
    console.log(err);
  });

app.proxy = true;
app.use(logger());
app.use(serve('public/autograph', {
	index: false
}));

app.use(async (ctx) => {
	console.log('Home page');
	ctx.body = await buildPage();
});

const server = app.listen(process.env.PORT || 4000)
server.on('listening', () => {
	console.log(`Client listening on port ${process.env.PORT || 4000}`);
});