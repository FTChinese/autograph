const debug = require('debug')('apn:home');
const Router = require('koa-router');
const router = new Router();
const moment = require('moment-timezone');
const minify = require('html-minifier').minify;
const render = require('../util/render.js');
const store = require('../util/store.js');
const uri = require('../util/uri.js');
const isProduction = process.env.NODE_ENV === 'production';

const env = {
  isProduction,
	static: 'http://interactive.ftchinese.com/',
  urlPrefix: isProduction ? 'http://ig.ftchinese.com/autograph' : ''
};

router.get('/', async function (ctx, next) {
  const [csvs, charts] = await Promise.all([
    store.getCsvStats(),
    store.getChartStats()
  ]);

  ctx.state = {
    publicUrl: uri.publicDir,
    csvs: csvs.map(isToday),
    charts: charts.map(isToday),
    env
  }

  ctx.body = await render('home.html', ctx.state);

  return await next();
});

function isToday(o) {
  const timeZone = 'Asia/Shanghai';
  // Create a UTC time and explicitly convert to Beijing time.
  const today = moment.utc().tz(timeZone);
  // Convert modification time to Beijing time.
  const modifiedTime = moment.utc(new Date(o.lastModified)).tz(timeZone);

  return Object.assign({}, o, {
    isToday: modifiedTime.isSame(today, 'day'),
    lastModified: modifiedTime.format('YYYY年M月D日 HH:mm:ss')
  });
}

module.exports = router;