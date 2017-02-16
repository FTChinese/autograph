const csvStats = require('../public/config/csv-stats.json');
const sorted = csvStats.sort((a, b) => {
    return Date.parse(b.lastModified) - Date.parse(a.lastModified);
});

console.log(sorted);
