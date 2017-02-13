module.exports = {
    index: 'http://ig.ft.com/autograph/',
    ofCsv: function (filename) {
        return `${this.index}data/${filename}`;
    },
    get svgConfig() {
        return `${this.index}config/nightingale-config.json`
    }
};