const http = require('http');
const path = require('path');

const koa = require('koa');
const app = koa();

const Router = require('koa-router');
const router = new Router();


const render = require('./render');

router.get('/', function *(next) {
	this.body = yield render('index.html');
});

app
	.use(router.routes())
	.use(router.allowedMethods());

module.exports = app;