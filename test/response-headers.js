const got = require('got');

got('http://ig.ft.com/autograph/')
    .then(res => {
        console.log(res.headers);
    })