const nunjucks = require('nunjucks');

var env = new nunjucks.Environment(
  new nunjucks.FileSystemLoader(
    [
    	'views',
    	'bower_components/ftc-footer/'
    ], 
    {
    	noCache: true,
    	watch: true
    }
  ),
  {autoescape: false}
);

function render(view, context) {
	return new Promise(function(resolve, reject) {
		env.render(view, context, function(err, result) {
			if (err) {
				reject(err);
			} else {
				resolve(result);
			}
		});
	});
}

module.exports = render;