var express = require('express'),
	http = require('http'),
	app = express(),
	favicon = require('serve-favicon'),
	Twig = require('twig'),
	randomstring = require('randomstring'),
	_ = require('underscore'),
	semiStatic = require('semi-static'),
	fs = require('fs'),
	marked = require('marked');

// livereload
if ('development' == app.get('env')) {

	// enable livereload
	app.use(require('connect-livereload')({
		port: 35729
	}));

	// disable cache
	app.disable('view cache');
	Twig.cache = false;
}

// views

app.set('views', __dirname + '/views');
app.set('view engine', 'twig');
app.set('twig options', {
	strict_variables: false
});

// twig config
Twig.extendFilter("markdown", function (value) {
	return marked(value);
});

// static files
app.use(express.static(__dirname + '/public'));
app.use(favicon(__dirname + '/public/img/favicon.ico'));

// data: navigation
app.locals = _.extend(app.locals, {
	menu: [{
		label: 'Elements',
		uri: '/'
	}, {
		label: 'Components',
		uri: '/components'
	}, {
		label: 'Patterns',
		uri: '/patterns'
	}],
	bodyClass: 'nav-closed',
	uuid: randomstring.generate(12),
	organization: "MIT Technology Review"
});

/**
 * Route middleware
 *
 * Track the current route as a local variable
 * in templates, this get's used for current nav
 * states
 */
app.use('/*', function (req, res, next) {
	app.locals = _.extend(app.locals, {
		activeRoute: req.route
	});
	next();
});

/**
 * Dynamic URL Routing
 *
 * Wildcard handler for all site pages, where the
 * URL path corresponds to a view template.
 */
app.get('/*', function (req, res) {

	// what view should we use based on the current route?
	var viewPath = app.get('views');
	var viewTemplate = (req.url === '/') ? 'index' : req.url.substring(1);
	var templatePath = viewPath + '/' + viewTemplate + '.twig';

	// does the view template for this route exist? if not serve an error page
	fs.exists(templatePath, function (exists) {
		if (exists) {
			res.render('layout-default', {
				view: viewTemplate + '.twig'
			});
		} else {
			res.render('layout-simple', {
				view: 'error-404.twig'
			});
		}
	});

});

/**
 * Error pages
 */

// 500
app.use(function (error, req, res, next) {
	res.status(500);

	// HTML
	if (req.accepts('html')) {
		res.render('layout-simple', {
			view: 'error-500.twig'
		});
		return;
	}

	// JSON
	if (req.accepts('json')) {
		res.send({
			error: 'Internal Server Error'
		});
		return;
	}

	// Plain-text
	res.type('txt').send('Internal Server Error');
});

/**
 * Virtual Host
 */
app.listen(9999);