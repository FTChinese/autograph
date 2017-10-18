const moment = require('moment');

console.log(moment());

console.log(moment().utcOffset());

console.log(moment.utc());

console.log(moment.utc().utcOffset());

console.log(moment.utc().utcOffset(8));