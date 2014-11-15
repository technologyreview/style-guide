var express = require('express'),
	app = express();

// views
app.set('views', __dirname + '/views');
app.set('view engine', 'twig');
app.set('twig options', {
	strict_variables: false
});

// route: index
app.get('/', function (req, res) {
	res.render('layout', {
		view: "index.twig"
	});
});

// route: page
app.get('/*', function (req, res) {
	var route = req.url.replace(window.location.
		'/', '', )
	res.render('layout', {
		view: "index.twig"
	});
});

// static files
app.use(express.static(__dirname + '/public'));

app.listen(9999);