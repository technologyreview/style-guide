/**
 * main.js
 *
 * Require.js configuration and setup, this defines dependencies,
 * shortcuts, and conditions using a URL router to conditional load
 * Backbone "view" .js files when a specific URL is loaded.
 *
 * This approach can be expanded on to group models, collections and
 * views together into a "module". More on that here:
 *
 * http://backbonetutorials.com/organizing-backbone-using-modules/
 */

// 
// Require.js configuration
// 
require.config({
	baseUrl: 'js/libs',

	// 
	// paths: shortcuts to certain scripts in our app
	// 
	paths: {
		jquery: 'jquery/dist/jquery.min',
		browser: 'jquery.browser/dist/jquery.browser.min',
		hashchange: 'jquery.hashchange.min',
		underscore: 'underscore/underscore-min',
		backbone: 'backbone/backbone',
		twig: 'twig.js/twig.min',
		router: '../routes',
		views: '../views',
		templates: '../templates'
	},

	// 
	// shims: these let us define dependencies for libraries that aren't formatted for AMD (like jQuery)
	// 
	shim: {
		browser: ["jquery"],
		hashchange: ["jquery", "browser"],
		backbone: {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		},
		underscore: {
			exports: '_'
		}
	},

	//
	// mapping: substitute/replace certain modules
	// more info: http://requirejs.org/docs/api.html#config-map
	// 
	map: {
		'*': {
			'css': 'require-css/css.min'
		}
	}
});

require(['jquery', 'backbone', 'router'], function ($, Backbone, Router) {
	var router = new Router();
	Backbone.history.start({
		pushState: true
	});
});