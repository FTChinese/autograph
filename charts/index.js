const co = require('co');
const buildArtifacts = require('../util/build-artifacts.js');
const draw = require('./draw.js');
const styles = require('../util/styles.js');
const uri = require('../util/uri.js');

function render(data) {
    return co(function *() {
        const result = yield styles.render(uri.chartScss, false);
        const css = result.css.toString().replace(/\n/g, '');
        const stats = yield data.map(datum => {
            return draw(datum, css)
                .then(svg => {
                    return buildArtifacts.saveSvg(datum.title, svg);
                })
                .then(stat => {
                    return Object.assign({
                        lastModified: datum.updated
                    }, stat);
                });
        });

        yield buildArtifacts.saveSvgStats(stats);
    })
    .catch(err => {
        console.log(err);
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
    })
    .catch(err => {
        throw err;
    });
}

module.exports = render;