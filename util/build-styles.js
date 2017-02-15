const sass = require('node-sass');
const path = require('path');
const fs = require('fs-jetpack');

function buildStyles(src) {
    return new Promise(function(resolve, reject) {
        sass.render({
            file: src,
            outputStyle: 'compressed',
            sourceMap: true,
            outFile: `test/${path.basename(src, '.scss')}.css`
        }, (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    });
}

buildStyles(path.resolve(__dirname, '../client/chart-styles.scss'))
    .then(result => {
        return Promise.all([
            fs.writeAsync(path.resolve(__dirname, '../public/styles/chart-styles.css'), result.css, 'utf8'),
            fs.writeAsync(path.resolve(__dirname, '../public/styles/chart-styles.css.map'), result.map, 'utf8')
        ]);
    })
    .catch(err => {
        throw err;
    });