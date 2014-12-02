// dependencies
var express = require('express'),
	http = require('http'),
	app = express(),
	favicon = require('serve-favicon'),
	swig = require('swig'),
	markedSwig = require('swig-marked'),
	randomstring = require('randomstring'),
	_ = require('underscore'),
	fs = require('fs');

// templating (w/Markdown)
markedSwig.useFilter(swig);
markedSwig.useTag(swig);
app.engine('html', swig.renderFile);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');

// configure environments
var port = process.env.PORT || 9999;
swig.setDefaults({
	cache: false
});
if ('development' === app.get('env')) {

	// disable cache
	app.disable('view cache');

	// enable livereload
	app.use(require('connect-livereload')({
		port: 35729
	}));
} else {
	app.enable('view cache');
}

// static files
app.use(express.static(__dirname + '/public'));
app.use(favicon(__dirname + '/public/img/favicon.ico'));

// data: navigation
app.locals = _.extend(app.locals, {
	menu: [{
		label: 'Home',
		uri: '/'
	}, {
		label: 'Page',
		uri: '/page'
	}, {
		label: 'Error',
		uri: '/404'
	}],
	bodyClass: 'nav-closed',
	uuid: randomstring.generate(12),
	organization: "MIT Technology Review",
	project: "Project title",
	logo: "/img/mittr-logo-square.png",
	year: 2014
});

/**
 * Dynamic URL Routing
 *
 * Wildcard handler for all site pages, where thse
 * URL path corresponds to a view template.
 */
app.get('/*', function (req, res) {

	// what view should we use based on the current route?
	var viewPath = app.get('views');
	var viewTemplate = (req.url === '/') ? 'index' : req.url.substring(1);
	var templatePath = viewPath + '/' + viewTemplate + '.html';
	var viewTitle = (req.url === '/') ? 'home' : req.url.substring(1);

	// simple layout
	if (req.url === '/') {
		res.render('layout-simple', {
			view: './index.html',
			activeRoute: req.url,
			title: viewTitle
		});
	}

	// defaults
	else {

		// does the view template for this route exist? if not serve an error page
		fs.exists(templatePath, function (exists) {
			if (exists) {
				res.render('layout-default', {
					view: viewTemplate + '.html',
					activeRoute: req.url,
					title: viewTitle
				});
			} else {
				res.render('layout-error', {
					view: './error-404.html',
					activeRoute: req.url,
					title: viewTitle
				});
			}
		});
	}
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
			view: './error-500.html'
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
app.listen(port);