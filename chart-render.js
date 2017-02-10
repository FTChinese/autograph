const jsdom = require('jsdom');
const d3 = require('d3');

jsdom.env(
  "<html><body></body></html>",
  function(err, window) {
    window.d3 = d3.select(window.document);
    const chartWidth = 304;
    const chartHeight = 270;

    const margin = {
      top: 100,
      right: 48,
      bottom: 50,
      left: 1
    };

    const plotWidth = chartWidth - margin.left - margin.right;
    const plotHeight = chartHeight - margin.top - margin.bottom;

    const keyLineLength = 25;
    const keyElementHeight = 20;

    const body = window.d3.select(body);
    const svg = body.append('svg')
      .attr('xmlns', 'http://www.w3.org/2000/svg')
      .attr('viewBox', `0 0 ${chartWidth} ${chartHeight}`);
  }
);

