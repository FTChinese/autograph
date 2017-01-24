const fs = require('mz/fs');
const path = require('path');
const url = require('url');
const got = require('got');
const cheerio = require('cheerio');

const baseUrl = 'http://ig.ft.com/autograph/';

got('http://ig.ft.com/autograph/')
  .then(res => {
    return res.body;
  })
  .then(body => {
    extractLinks(body);
  })
  .catch(err => {
    console.log(err);
  });