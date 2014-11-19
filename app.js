var express = require('express'),
	http = require('http'),
	app = express(),
	favicon = require('serve-favicon'),
	Twig = require('twig'),
	randomstring = require('randomstring');

// livereload
app.use(require('connect-livereload')({
	port: 35729
}));

// views
app.disable('view cache');
app.set('views', __dirname + '/views');
app.set('view engine', 'twig');
app.set('twig options', {
	strict_variables: false
});

// twig config
Twig.cache = false;
Twig.extendFilter("markdown", function (value) {

	// covert markdown to HTML
	var marked = require('marked');
	return marked(value);
});

// static files
app.use(express.static(__dirname + '/public'));
app.use(favicon(__dirname + '/public/img/favicon.ico'));

// data: navigation
var globals = {
	menu: [{
		label: 'Elements',
		uri: '/'
	}, {
		label: 'Components',
		uri: '/components'
	}, {
		label: 'Patterns',
		uri: '/patterns'
	}, {
		label: 'Resources',
		uri: '/resources'
	}],
	bodyClass: 'nav-closed',
	uuid: randomstring.generate(12),
	organization: "MIT Technology Review"
};

/**
 * Route: Index
 *
 * Initial root page routing handler
 */
app.get('/', function (req, res) {
	res.render('layout', {
		view: 'index.twig',
		globals: globals
	});
});

/**
 * Route: Pages
 *
 * Wildcard handler for all site pages, where the
 * URL path corresponds to a view template.
 */
app.get('/*', function (req, res) {
	var viewTemplate = (req.route) ? req.url.substring(1) : 'index';
	res.render('layout', {
		view: viewTemplate + '.twig',
		globals: globals
	});
});

/**
 * Virtual Host
 */
app.listen(9999);