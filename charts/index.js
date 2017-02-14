const buildArtifacts = require('../util/build-artifacts.js');
const draw = require('./draw.js');

/*
 * Draw a svg with using `data`
 * Save the svg, then return an object
 * @return {Object}
 * @return {String} o.lastModified
 * @return {String} o.name
 * @return {String} o.size
 */
function drawLinesAndGetStat(data) {
    return draw(data)
        .then(svg => {
            return buildArtifacts.saveSvg(data.title, svg);
        })
        .then(stat => {
            return Object.assign({
                lastModified: data.updated
            }, stat);
        });
}

/*
 * Render all svgs using the `data` array and save them.
 * Then save the statictics of svg.
 */
function render(data) {
    const promisedStats = data.map(datum => {
        return drawLinesAndGetStat(datum);
    });

    return Promise.all(promisedStats)
        .then(stats => {
            return buildArtifacts.saveSvgStats(stats);
        });
}

if (require.main == module) {
    const co = require('co');
    const fetchJson = require('../endpoints').json;

    co(function *() {
        let data = null;
        try {
            data = yield buildArtifacts.getSvgConfig();
        } catch (err) {
            data = yield fetchJson();
        }
        yield render(data);
    });
}

module.exports = render;