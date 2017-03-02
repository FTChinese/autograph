const today = getUTCDateString(new Date());

function getUTCDateString(date) {
  return `${date.getUTCFullYear()}${date.getUTCMonth() + 1}${date.getUTCDate()}`
}

console.log(today);

const modified = getUTCDateString(new Date('Wed, 01 Mar 2017 23:50:10 GMT'));
console.log(modified);