const _ = require('lodash');
const path = require('path');
const writeJsonFile = require('write-json-file');
const transform = require('../translate/transform.js');

const result = transform(sources, mirror.keys, glossary);
writeJsonFile(path.resolve(__dirname, '.tmp/test-translation.json'), result)
    .then(() => {
        console.log('done');
    });