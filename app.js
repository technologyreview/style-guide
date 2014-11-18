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
Twig.cache = false;
app.set('views', __dirname + '/views');
app.set('view engine', 'twig');
app.set('twig options', {
	strict_variables: false
});

// static files
app.use(express.static(__dirname + '/public'));
app.use(favicon(__dirname + '/public/img/favicon.ico'));

// data: navigation
var globals = {
	menu: [{
		label: 'General',
		uri: '/'
	}, {
		label: 'Editorial',
		uri: '/editorial'
	}, {
		label: 'Events',
		uri: '/events'
	}, {
		label: 'Support',
		uri: '/support'
	}],
	bodyClass: '',
	uuid: randomstring.generate(12)
};

// route: index
app.get('/', function (req, res) {
	res.render('layout', {
		view: 'general.twig',
		globals: globals
	});
});

// route: page
app.get('/*', function (req, res) {
	var viewTemplate = (req.route) ? req.url.substring(1) : 'general';
	console.log('viewTemplate', viewTemplate);
	res.render('layout', {
		view: viewTemplate + '.twig',
		globals: globals
	});
});

app.listen(9999);