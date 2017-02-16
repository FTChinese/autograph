const d3 = require('d3-time-format');

const timeString = '06 Jan 2017';

function convertTime(str) {
  const parse = d3.timeParse('%d %b %Y');
  const format = d3.timeFormat('%Y年%-m月%-d日');
  return format(parse(str));
}

console.log(convertTime(timeString));

const parse = d3.timeParse('%d %b %Y');

const locale = d3.timeFormatLocale({
  "dateTime": "%x %A %X",
  "date": "%Y年%-m月%-d日",
  "time": "%H:%M:%S",
  "periods": ["上午", "下午"],
  "days": ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
  "shortDays": ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
  "months": ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
  "shortMonths": ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]
});

const localeFormat = locale.format('%x');

function format(str) {
    return localeFormat(parse(str));
}

module.exports = {
    parse: parse,
    format: format
};