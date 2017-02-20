const http = require('http');
const path = require('path');

const koa = require('koa');
const app = koa();

const Router = require('koa-router');
const router = new Router();

router.post('/', function *() {
	const push = this.request.body;

	console.log(push);
});

app
	.use(router.routes())
	.use(router.allowedMethods());

module.exports = app;