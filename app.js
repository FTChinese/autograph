const debug = require('debug')('ag:server');
const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const router = new Router();
const logger = require('koa-logger');
const uri = require('./util/uri.js');
const home = require('./server/home.js');
const handleErrors = require('./server/handle-errors.js');

const port = process.env.PORT || 4000;

app.proxy = true;
app.use(logger());

if (process.env.NODE_ENV !== 'production') {
  const serve = require('koa-static');
  app.use(serve(uri.publicDir));
}

app.use(handleErrors);

router.use('/', home.routes());

app.use(router.routes());

const server = app.listen(port);
server.on('listening', () => {
	debug(`Client listening on port ${port}`);
});
// Logging server error.
server.on('error', (error) => {
  debug(error);
});