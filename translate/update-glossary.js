// Extract english text to glossay.json.
const path = require('path');
const co = require('co');
const loadJsonFile = require('load-json-file');
const writeJsonFile = require('write-json-file');
const _ = require('lodash');
const keysToExtract = require('./keys.js');

const configFile = path.resolve(__dirname, '../public/config/nightingale-config.json');
const glossaryFile = path.resolve(__dirname, '../glossary/en-cn.json');

function extract(arr, keys) {
    return arr.map(obj => {
        return keys.map(key => {
            if (!(_.isPlainObject(key) || _.isString(key))) {
                return '';
            }
            if (_.isPlainObject(key)) {
                const nextLevelArr = _.propertyOf(obj)(key.path);            
                return extract(nextLevelArr, key.keys);
            }
            return obj[key];
        });
    });
}

// flatten the array. Use array element as key for glossary.
function arrayToObject(arr) {
    return _.flattenDeep(arr)
        .reduce((o, k) => {
            if (!o.hasOwnProperty(k)) {
                o[k] = '';
            }
            return o;
        }, {});
}

function updateGlossary(data, keys=keysToExtract) {
    const latestGlossary = arrayToObject(extract(data, keys));
    const latestNum = Object.keys(latestGlossary).length;

    return loadJsonFile(glossaryFile)
        .then(previousGlossary => {
// merge old glosaary into new.
            const previousNum = Object.keys(previousGlossary).length;
            console.log(`Newly added glossary: ${latestNum - previousNum}`);
            return Object.assign(latestGlossary, previousGlossary);
        })
        .catch(err => {
// in case file does not exist.            
            return latestGlossary;
        });
}

if (require.main == module) {
    co(function *() {
        const configs = yield loadJsonFile(configFile);

        updatedGlossary = yield updateGlossary(configs);

        yield writeJsonFile(glossaryFile, updatedGlossary);
    })
    .catch(err => {
        console.log(err);
    });
}

module.exports = updateGlossary;