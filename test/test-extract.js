const _ = require('lodash');
const path = require('path');
const loadJsonFile = require('load-json-file');
const writeJsonFile = require('write-json-file');
const keysToExtract = require('./keys.json');
const sources = require('./sources.json');
const glossary = require('./glossary.json');
const glossaryFile = path.resolve(__dirname, './glossary.json');

function extract(arr, keys) {
// extractedText is a nested array.
    return arr.map(obj => {
        return keys.map(key => {
            if (!(_.isPlainObject(key) || _.isString(key))) {
                return '';
            }
            if (_.isPlainObject(key)) {
                const nextLevelArr = _.propertyOf(obj)(key.path);
                return extract(nextLevelArr, key.keys);
            }
            return _.propertyOf(obj)(key);
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

    return loadJsonFile(glossaryFile)
        .then(builtGlossary => {
// merge old glosaary into new.
            return Object.assign(latestGlossary, builtGlossary);
        })
        .catch(err => {
// in case file does not exist.            
            return latestGlossary;
        });
}

const extracted = extract(sources, keysToExtract)
console.dir(extracted, {depth: null});

const glossaryObj = arrayToObject(extracted);
console.log(glossaryObj);

updateGlossary(sources)
    .then(glossary => {
        console.log(glossary)
        return writeJsonFile(glossaryFile, glossary);
    })
    .catch(err => {
        console.log(err);
    });