const got = require('got');
const filesize = require('filesize');
const fs = require('fs-jetpack');

got('http://ig.ft.com/autograph/data/us-10yr-treasury.csv')
    .then(res => {
        console.log(res.headers);
        const size = Buffer.byteLength(res.body);

        console.log(humanReadableSize(size));

        return fs.writeAsync('../.tmp/test.csv', res.body, 'utf8')
            .then(() => {
                return filesize(size, {round: 0});
            });
    })
    .then(size => {
        console.log(size);
    })
    .catch(err => {
        console.log(err);
    });

function humanReadableSize(size) {
    if (typeof size !== 'number') {
        size = Number(size);
    }

    return Math.round(size / 1024) + 'kb';
}