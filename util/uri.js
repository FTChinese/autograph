const path = require('path');

module.exports = {
    index: 'http://ig.ft.com/autograph/',
    ofCsv: function (filename) {
        return `${this.index}data/${filename}`;
    },
    get svgConfig() {
        return `${this.index}config/nightingale-config.json`
    },
    chartScss: path.resolve(__dirname, '../client/chart-styles.scss'),
    mainScss: path.resolve(__dirname, '../client/main.scss')
};