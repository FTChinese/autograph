const path = require('path');
const serve = require('koa-static');
const koa = require('koa');
const app = koa();
const logger = require('koa-logger');
const mount = require('koa-mount');
const error = require('koa-error');
const bodyParser = require('koa-bodyparser');
const index = require('./server/index.js');

app.use(serve('graphics', {
	index: false
}));

app.use(logger());
app.use(bodyParser());

app.use(mount('/', index));

const server = app.listen(process.env.PORT || 3000)
server.on('listening', () => {
	console.log(`Client listening on port ${process.env.PORT || 3000}`);
});