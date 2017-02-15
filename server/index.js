const http = require('http');
const path = require('path');

const koa = require('koa');
const app = koa();

const Router = require('koa-router');
const router = new Router();

const render = require('./render');
const buildArtifacts = require('../util/build-artifacts.js');

router.get('/', function *(next) {

	const [csvs, charts] = yield [
		buildArtifacts.getCsvStats, buildArtifacts.getSvgStats];
	console.log(csvs);

	this.body = yield render('index.html', {
		csvs,
		charts
	});
});

app
	.use(router.routes())
	.use(router.allowedMethods());

module.exports = app;