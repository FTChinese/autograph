const time = require('../util/time-format.js');

const timeString = '06 Jan 2017';

const dateObj = time.parse(timeString);
console.log(dateObj);

const dateString = time.format(timeString);
console.log(dateString);
