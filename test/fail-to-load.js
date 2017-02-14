const loadJsonFile = require('load-json-file');

function tryLoadFile(file) {
    return loadJsonFile(file)
        .catch(err => {
            return {};
        });
}

tryLoadFile('test.json')
    .then(data => {
        console.log('log data');
        console.log(data);
    })
    .catch(err => {
        console.log(`error.`)
        console.log(err);
    });